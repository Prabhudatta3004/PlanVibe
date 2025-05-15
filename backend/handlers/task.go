package handlers

import (
	"net/http"
	"planvibe/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TaskInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	DueDate     string `json:"due_date"`
	Status      string `json:"status" binding:"required"`
	Priority    string `json:"priority" binding:"required"`
	UserID      uint   `json:"user_id" binding:"required"`
}

func CreateTask(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input TaskInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		dueDate, _ := parseTime(input.DueDate)
		task := models.Task{
			Title:       input.Title,
			Description: input.Description,
			DueDate:     dueDate,
			Status:      input.Status,
			Priority:    input.Priority,
			UserID:      input.UserID,
		}
		if err := db.Create(&task).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
			return
		}
		c.JSON(http.StatusCreated, task)
	}
}

func GetTasks(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userIDStr := c.Query("user_id")
		var tasks []models.Task
		if userIDStr != "" {
			userID, _ := strconv.Atoi(userIDStr)
			db.Where("user_id = ?", userID).Find(&tasks)
		} else {
			db.Find(&tasks)
		}
		c.JSON(http.StatusOK, tasks)
	}
}

func GetTask(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var task models.Task
		if err := db.First(&task, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		c.JSON(http.StatusOK, task)
	}
}

func UpdateTask(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var task models.Task
		if err := db.First(&task, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}
		var input TaskInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		dueDate, _ := parseTime(input.DueDate)
		db.Model(&task).Updates(models.Task{
			Title:       input.Title,
			Description: input.Description,
			DueDate:     dueDate,
			Status:      input.Status,
			Priority:    input.Priority,
			UserID:      input.UserID,
		})
		c.JSON(http.StatusOK, task)
	}
}

func DeleteTask(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if err := db.Delete(&models.Task{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
	}
}

// Helper to parse time from string (YYYY-MM-DD)
func parseTime(dateStr string) (t time.Time, err error) {
	if dateStr == "" {
		return t, nil
	}
	t, err = time.Parse("2006-01-02", dateStr)
	return
}
