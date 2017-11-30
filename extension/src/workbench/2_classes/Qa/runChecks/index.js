function removeSourceLabels ($sourceLabels) {
   if ($sourceLabels) {
      $sourceLabels.contents().unwrap()
   }
}

function removeTargetLabels ($targetLabels) {
   if ($targetLabels) {
      $targetLabels.remove()
   }
}

export {removeSourceLabels, removeTargetLabels}
