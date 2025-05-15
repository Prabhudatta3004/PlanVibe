package models

import (
	"time"
)

type Goal struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `json:"description"`
	Category    string    `gorm:"not null" json:"category"`
	Progress    int       `gorm:"default:0" json:"progress"`
	DueDate     time.Time `json:"due_date"`
	UserID      uint      `gorm:"not null" json:"user_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
