package com.tanacchi.pantry.planner.api.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.annotation.JsonValue
import com.tanacchi.pantry.planner.api.model.Category
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
 * アイテム情報
 * @param id アイテムID
 * @param name アイテム名
 * @param category アイテムのカテゴリ
 * @param pantryId 所属パントリーID
 * @param quantity 数量
 * @param unit 単位
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 */
data class Item(

    @Schema(example = "3", required = true, readOnly = true, description = "アイテムID")
    @get:JsonProperty("id", required = true) val id: kotlin.Int,

    @Schema(example = "null", required = true, description = "アイテム名")
    @get:JsonProperty("name", required = true) val name: kotlin.String,

    @field:Valid
    @Schema(example = "null", required = true, description = "アイテムのカテゴリ")
    @get:JsonProperty("category", required = true) val category: Category,

    @Schema(example = "null", required = true, description = "所属パントリーID")
    @get:JsonProperty("pantryId", required = true) val pantryId: kotlin.Int,

    @Schema(example = "null", required = true, description = "数量")
    @get:JsonProperty("quantity", required = true) val quantity: kotlin.Int,

    @Schema(example = "null", required = true, description = "単位")
    @get:JsonProperty("unit", required = true) val unit: kotlin.String,

    @Schema(example = "null", required = true, readOnly = true, description = "作成日時")
    @get:JsonProperty("createdAt", required = true) val createdAt: java.time.OffsetDateTime,

    @Schema(example = "null", required = true, readOnly = true, description = "更新日時")
    @get:JsonProperty("updatedAt", required = true) val updatedAt: java.time.OffsetDateTime
    ) {

}

