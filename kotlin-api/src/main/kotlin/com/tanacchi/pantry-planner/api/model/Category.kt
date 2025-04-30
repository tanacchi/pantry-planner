package com.tanacchi.pantry-planner.api.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonValue
import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import jakarta.validation.Valid
import io.swagger.v3.oas.annotations.media.Schema

/**
* 
* Values: FOOD,DRINK,SNACK,SPICE,OTHER
*/
enum class Category(@get:JsonValue val value: kotlin.String) {

    FOOD("Food"),
    DRINK("Drink"),
    SNACK("Snack"),
    SPICE("Spice"),
    OTHER("Other");

    companion object {
        @JvmStatic
        @JsonCreator
        fun forValue(value: kotlin.String): Category {
                return values().first{it -> it.value == value}
        }
    }
}

