package initializers

import "github.com/ShashaankS/GoEdit/backend/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}