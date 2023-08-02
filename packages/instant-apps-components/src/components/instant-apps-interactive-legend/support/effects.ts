import { loadModules } from 'esri-loader';

interface FeatureLayerFeatureEffect extends __esri.FeatureLayer {
  featureEffect: __esri.FeatureEffect;
}

export async function getMergedEffect(presetLayerEffect: string, featureLayerView: __esri.FeatureLayerView, type: 'includedEffect' | 'excludedEffect') {
  const [jsonUtils] = await loadModules(['esri/layers/effects/jsonUtils']);
  const { toJSON, fromJSON } = jsonUtils;

  const layer = featureLayerView?.layer as FeatureLayerFeatureEffect;
  if (!presetLayerEffect) {
    if (layer?.effect) {
      return layer.effect;
    } else if (layer?.featureEffect) {
      return type === 'includedEffect' ? layer.featureEffect.includedEffect : layer.featureEffect.excludedEffect;
    } else {
      return null;
    }
  }

  // CONVERT EXISTING EFFECT AND PRESET LAYER EFFECT TO JSON
  const presetLayerEffectJSON = toJSON(presetLayerEffect);
  const layerEffect = layer.effect;
  const layerFeatureEffect = layer.featureEffect;
  let existingEffect: any;

  if (layerFeatureEffect) {
    existingEffect = type === 'includedEffect' ? layer.featureEffect.includedEffect : layer.featureEffect.excludedEffect;
  } else {
    existingEffect = layerEffect;
  }

  const existingEffectJSON = existingEffect ? toJSON(existingEffect) : null;

  // RETURN PRESET LAYER EFFECT IF THERE ARE NO EXISTING EFFECTS
  if (!existingEffectJSON) {
    return fromJSON(presetLayerEffectJSON);
  }

  let effectToUse = [...existingEffectJSON];

  if (presetLayerEffectJSON) {
    // ITERATE THROUGH PRESET LAYER EFFECT JSON
    presetLayerEffectJSON.forEach(presetLayerEffectItem => {
      // ITERATE THROUGH EXISTING EFFECT JSON
      effectToUse.forEach(existingEffectToUseItem => {
        const { value } = existingEffectToUseItem;
        if (value) {
          // ITERATE THROUGH EXISTING EFFECT JSON VALUES
          value.forEach((effectValue, effectIndex) => {
            // REPLACE EXISTING EFFECT VALUE IF SAME TYPE IS PRESENT IN PRESET LAYER EFFECT
            if (effectValue.type === presetLayerEffectItem.type) {
              value[effectIndex] = presetLayerEffectItem;
            }
            // OTHERWISE MODIFY EXISTING EFFECT
            else {
              const notMerged = !existingEffectToUseItem.value.find(existingEffectItemToMerge => existingEffectItemToMerge.type === presetLayerEffectJSON[0].type);

              // CHECK IF PRESET LAYER EFFECT HAS BEEN MERGED, IF NOT YET MERGED APPEND PRESET LAYER EFFECT TO EXISTING EFFECT
              if (notMerged) {
                existingEffectToUseItem.value = [...existingEffectToUseItem.value, ...presetLayerEffectJSON];
              }
            }
          });
        } else {
          // HANDLE NON SCALE EFFECTS
          const notMerged = !effectToUse.find(nonScaleEffectToUseItem => nonScaleEffectToUseItem.type === existingEffectToUseItem.type);
          const presetNotMerged = !effectToUse.find(nonScaleEffectToUseItem => nonScaleEffectToUseItem.type === presetLayerEffectItem.type);
          if (presetNotMerged) {
            effectToUse = [...effectToUse, presetLayerEffectItem];
          }
          if (notMerged) {
            effectToUse = [...effectToUse, existingEffectToUseItem];
          }
        }
      });
    });
  }
  const mergedEffect = fromJSON(effectToUse);
  return mergedEffect;
}
