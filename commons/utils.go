package commons

import (
	"strconv"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func FiltersHero(field, value string) primitive.D {
	if strings.Contains(field, "alignment") {
		v, _ := strconv.Atoi(value)
		return bson.D{{Key: field, Value: v}}
	}
	if strings.Contains(field, "gender") {
		v, _ := strconv.Atoi(value)
		return bson.D{{Key: field, Value: v}}
	}
	if strings.Contains(field, "publisher") {
		v, _ := strconv.Atoi(value)
		return bson.D{{Key: field, Value: v}}
	}
	if strings.Contains(field, "race") {
		return bson.D{{Key: field, Value: value}}
	}
	return bson.D{}
}
