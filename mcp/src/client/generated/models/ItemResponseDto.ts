/* tslint:disable */
/* eslint-disable */
/**
 * gomoking bff API
 * BFF
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ItemResponseDto
 */
export interface ItemResponseDto {
    /**
     * アイテムID
     * @type {number}
     * @memberof ItemResponseDto
     */
    id: number;
    /**
     * アイテム名
     * @type {string}
     * @memberof ItemResponseDto
     */
    name: string;
    /**
     * アイテムのカテゴリ
     * @type {string}
     * @memberof ItemResponseDto
     */
    category: ItemResponseDtoCategoryEnum;
    /**
     * 所属パントリーID
     * @type {number}
     * @memberof ItemResponseDto
     */
    pantryId: number;
    /**
     * 数量
     * @type {number}
     * @memberof ItemResponseDto
     */
    quantity: number;
    /**
     * 単位
     * @type {string}
     * @memberof ItemResponseDto
     */
    unit: string;
    /**
     * 作成日時
     * @type {Date}
     * @memberof ItemResponseDto
     */
    createdAt: Date;
    /**
     * 更新日時
     * @type {Date}
     * @memberof ItemResponseDto
     */
    updatedAt: Date;
    /**
     * 賞味期限
     * @type {Date}
     * @memberof ItemResponseDto
     */
    expiresAt?: Date | null;
}


/**
 * @export
 */
export const ItemResponseDtoCategoryEnum = {
    Food: 'Food',
    Drink: 'Drink',
    Snack: 'Snack',
    Spice: 'Spice',
    Other: 'Other'
} as const;
export type ItemResponseDtoCategoryEnum = typeof ItemResponseDtoCategoryEnum[keyof typeof ItemResponseDtoCategoryEnum];


/**
 * Check if a given object implements the ItemResponseDto interface.
 */
export function instanceOfItemResponseDto(value: object): value is ItemResponseDto {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('pantryId' in value) || value['pantryId'] === undefined) return false;
    if (!('quantity' in value) || value['quantity'] === undefined) return false;
    if (!('unit' in value) || value['unit'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function ItemResponseDtoFromJSON(json: any): ItemResponseDto {
    return ItemResponseDtoFromJSONTyped(json, false);
}

export function ItemResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ItemResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'category': json['category'],
        'pantryId': json['pantryId'],
        'quantity': json['quantity'],
        'unit': json['unit'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'expiresAt': json['expiresAt'] == null ? undefined : (new Date(json['expiresAt'])),
    };
}

export function ItemResponseDtoToJSON(json: any): ItemResponseDto {
    return ItemResponseDtoToJSONTyped(json, false);
}

export function ItemResponseDtoToJSONTyped(value?: ItemResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'name': value['name'],
        'category': value['category'],
        'pantryId': value['pantryId'],
        'quantity': value['quantity'],
        'unit': value['unit'],
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
        'expiresAt': value['expiresAt'] == null ? undefined : ((value['expiresAt'] as any).toISOString()),
    };
}

