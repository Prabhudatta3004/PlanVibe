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

	r.Use(cors.Default())

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	r.POST("/register", handlers.Register(db))
	r.POST("/login", handlers.Login(db))

	// Task CRUD endpoints
	r.POST("/tasks", handlers.CreateTask(db))
	r.GET("/tasks", handlers.GetTasks(db))
	r.GET("/tasks/:id", handlers.GetTask(db))
	r.PUT("/tasks/:id", handlers.UpdateTask(db))
	r.DELETE("/tasks/:id", handlers.DeleteTask(db))

	// Goal CRUD endpoints
	r.POST("/goals", handlers.CreateGoal(db))
	r.GET("/goals", handlers.GetGoals(db))
	r.GET("/goals/:id", handlers.GetGoal(db))
	r.PUT("/goals/:id", handlers.UpdateGoal(db))
	r.DELETE("/goals/:id", handlers.DeleteGoal(db))

	r.Run(":8080") // listen and serve on 0.0.0.0:8081
}
