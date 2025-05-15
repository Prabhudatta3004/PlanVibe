package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"planvibe/handlers"
	"planvibe/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass, dbHost, dbPort, dbName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	log.Println("Connected to MySQL database!")

	// Auto-migrate User, Task, and Goal models
	err = db.AutoMigrate(&models.User{}, &models.Task{}, &models.Goal{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	log.Println("Database migrated (User, Task, Goal tables)!")

	_ = db // Prevent unused variable error for now

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:5174"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	r.POST("/register", handlers.Register(db))
	r.POST("/login", handlers.Login(db))

	// Secure endpoints with JWT middleware
	protected := r.Group("/")
	protected.Use(handlers.JWTAuthMiddleware())
	protected.GET("/dashboard", dashboardHandler(db))
	protected.GET("/tasks", handlers.GetTasks(db))
	protected.POST("/tasks", handlers.CreateTask(db))
	protected.GET("/tasks/:id", handlers.GetTask(db))
	protected.PUT("/tasks/:id", handlers.UpdateTask(db))
	protected.DELETE("/tasks/:id", handlers.DeleteTask(db))
	protected.GET("/goals", handlers.GetGoals(db))
	protected.POST("/goals", handlers.CreateGoal(db))
	protected.GET("/goals/:id", handlers.GetGoal(db))
	protected.PUT("/goals/:id", handlers.UpdateGoal(db))
	protected.DELETE("/goals/:id", handlers.DeleteGoal(db))

	r.Run(":8080") // listen and serve on 0.0.0.0:8081
}

func dashboardHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		var completedTasks int64
		db.Model(&models.Task{}).Where("user_id = ? AND status = ?", userID, "Done").Count(&completedTasks)
		var tasks []models.Task
		db.Where("user_id = ?", userID).Order("due_date asc").Limit(3).Find(&tasks)
		var goals []models.Goal
		db.Where("user_id = ?", userID).Find(&goals)
		// Calculate average progress
		avgProgress := 0
		if len(goals) > 0 {
			total := 0
			for _, g := range goals {
				total += g.Progress
			}
			avgProgress = total / len(goals)
		}
		c.JSON(http.StatusOK, gin.H{
			"completedTasks": completedTasks,
			"upcomingTasks":  tasks,
			"goalsProgress":  avgProgress,
			"goals":          goals,
		})
	}
}
