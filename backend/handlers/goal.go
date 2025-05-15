package handlers

import (
	"net/http"
	"planvibe/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type GoalInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Category    string `json:"category" binding:"required"`
	Progress    int    `json:"progress"`
	DueDate     string `json:"due_date"`
	UserID      uint   `json:"user_id" binding:"required"`
}

func CreateGoal(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input GoalInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		dueDate, _ := parseTime(input.DueDate)
		goal := models.Goal{
			Title:       input.Title,
			Description: input.Description,
			Category:    input.Category,
			Progress:    input.Progress,
			DueDate:     dueDate,
			UserID:      input.UserID,
		}
		if err := db.Create(&goal).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create goal"})
			return
		}
		c.JSON(http.StatusCreated, goal)
	}
}

func GetGoals(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userIDStr := c.Query("user_id")
		var goals []models.Goal
		if userIDStr != "" {
			userID, _ := strconv.Atoi(userIDStr)
			db.Where("user_id = ?", userID).Find(&goals)
		} else {
			db.Find(&goals)
		}
		c.JSON(http.StatusOK, goals)
	}
}

func GetGoal(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var goal models.Goal
		if err := db.First(&goal, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Goal not found"})
			return
		}
		c.JSON(http.StatusOK, goal)
	}
}

func UpdateGoal(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var goal models.Goal
		if err := db.First(&goal, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Goal not found"})
			return
		}
		var input GoalInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		dueDate, _ := parseTime(input.DueDate)
		db.Model(&goal).Updates(models.Goal{
			Title:       input.Title,
			Description: input.Description,
			Category:    input.Category,
			Progress:    input.Progress,
			DueDate:     dueDate,
			UserID:      input.UserID,
		})
		c.JSON(http.StatusOK, goal)
	}
}

func DeleteGoal(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		if err := db.Delete(&models.Goal{}, id).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete goal"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Goal deleted"})
	}
}
