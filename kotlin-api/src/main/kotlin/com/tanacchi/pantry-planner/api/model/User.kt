package com.tanacchi.pantry.planner.api.model

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
 * @param id ユーザーID
 * @param lineUid LINE UID
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 * @param lastLoginAt 最終ログイン日時
 */
data class User(

    @Schema(example = "1", required = true, readOnly = true, description = "ユーザーID")
    @get:JsonProperty("id", required = true) val id: kotlin.Int,

    @Schema(example = "U1234567890abcdef1234567890abcdef", required = true, description = "LINE UID")
    @get:JsonProperty("lineUid", required = true) val lineUid: kotlin.String,

    @Schema(example = "null", required = true, readOnly = true, description = "作成日時")
    @get:JsonProperty("createdAt", required = true) val createdAt: java.time.OffsetDateTime,

    @Schema(example = "null", required = true, readOnly = true, description = "更新日時")
    @get:JsonProperty("updatedAt", required = true) val updatedAt: java.time.OffsetDateTime,

    @Schema(example = "null", required = true, readOnly = true, description = "最終ログイン日時")
    @get:JsonProperty("lastLoginAt", required = true) val lastLoginAt: java.time.OffsetDateTime
    ) {

}

