package com.tanacchi.pantry-planner.api.model

import java.util.Objects
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
 * @param id パントリーID
 * @param userId 所有者ユーザーID
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 */
data class Pantry(

    @Schema(example = "2", required = true, readOnly = true, description = "パントリーID")
    @get:JsonProperty("id", required = true) val id: kotlin.Int,

    @Schema(example = "null", required = true, description = "所有者ユーザーID")
    @get:JsonProperty("userId", required = true) val userId: kotlin.Int,

    @Schema(example = "null", required = true, readOnly = true, description = "作成日時")
    @get:JsonProperty("createdAt", required = true) val createdAt: java.time.OffsetDateTime,

    @Schema(example = "null", required = true, readOnly = true, description = "更新日時")
    @get:JsonProperty("updatedAt", required = true) val updatedAt: java.time.OffsetDateTime
    ) {

}

