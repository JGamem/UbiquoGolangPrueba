package handlers

import (
	"net/http"
	"ubiquogo/mongodb"

	"github.com/labstack/echo/v4"
)

func DeleteHeroes(c echo.Context) error {
	ID := c.Param("id")

	if ID == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{"msg": "Invalid data"})
	}

	err := mongodb.DelHero(ID)
	if err != nil {
		// Puedes agregar más detalles sobre el error para depuración
		return c.JSON(http.StatusInternalServerError, echo.Map{"msg": "Error deleting hero", "error": err.Error()})
	}

	return c.JSON(http.StatusOK, echo.Map{"msg": "Content deleted - " + ID})
}
