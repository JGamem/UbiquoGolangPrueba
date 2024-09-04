package handlers

import (
	"log"
	"net/http"
	"ubiquogo/model"
	"ubiquogo/mongodb"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateHero(c echo.Context) error {
	ID := c.Param("id")

	if ID == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{"msg": "Invalid ID"})
	}

	// Convertir el ID de string a ObjectID
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"msg": "Invalid ID format"})
	}

	var h model.Hero

	if err := c.Bind(&h); err != nil {
		log.Println(err)
		return c.JSON(http.StatusBadRequest, echo.Map{"msg": "Invalid data"})
	}

	// Llamar a la función de MongoDB para actualizar el héroe
	err = mongodb.UpdateHero(objectID, h)
	if err != nil {
		log.Println(err)
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, echo.Map{"msg": "Hero updated"})
}
