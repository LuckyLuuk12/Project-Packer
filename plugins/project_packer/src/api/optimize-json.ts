/**
 * This file is part of the "project_packer" plugin for Blockbench.
 * It includes logic to remove and optimize JSON files.
 * e.g. 
 * - removing empty objects, arrays, and properties.
 * - removing comments.
 * - removing unnecessary whitespace / formatting it to smallest json possible.
 * - prettifing json back to human readable format.
 */

export function prettifyJson(json: string): string {
  return JSON.stringify(JSON.parse(json), null, 2);
}

export function compactJson(json: string): string {
  return JSON.stringify(JSON.parse(json));
}

export function optimizeJson(json: string): string {
  // Remove the "credit": "Made with Blockbench" property
  const optimizedJson = JSON.parse(json);
  delete optimizedJson.credit;
  return compactJson(JSON.stringify(optimizedJson));
}

// TODO: maybe we can also make a function that takes the "textures" list and minimizes the names used in there
// e.g. "textures": { "firstTexture": "./someTexture" } -> "textures": { "a": "./someTexture" }
// We could also try to add a function that renames all custom json models (depending on some settings maybe)
// e.g. "custom_model_0.json" -> "0.json", "custom_model_0.json" -> "1.json", etc. for easier usage in the 
// generate-modeldata.ts file