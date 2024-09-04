package handlers

import (
	"log"
	"net/http"
	"strings"
	"ubiquogo/model"
	"ubiquogo/mongodb"

	"github.com/labstack/echo/v4"
)

func GetHeroes(c echo.Context) error {
	value := c.QueryParam("search")
	if value == "" {
		h := mongodb.GetHeroes()

		if len(h) < 1 {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.JSON(http.StatusOK, h)
	}

	items := strings.Split(value, ":")

	h := mongodb.GetHero(items[0], items[1])

	return c.JSON(http.StatusOK, h)
}

func GetHero(c echo.Context) error {
	value := c.QueryParam("search")
	if value == "" {
		return c.NoContent(http.StatusInternalServerError)
	}
	h := mongodb.GetHeroes()

	if len(h) < 1 {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, h)
}

func AddHero(c echo.Context) error {
	var h model.Hero

	if err := c.Bind(&h); err != nil {
		log.Println(err)
		return c.JSON(http.StatusBadRequest, echo.Map{"msg": "Invalid data"})
	}

	res := mongodb.NewHero(h)
	if res == "" {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.NoContent(http.StatusCreated)
}

func DeleteHero(c echo.Context) error {
	ID := c.Param("id")

	if ID == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{"msg": "Invalid data"})
	}

	err := mongodb.DelHero(ID)
	if err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusAccepted, echo.Map{"msg": "Content deleted - " + ID})
}
