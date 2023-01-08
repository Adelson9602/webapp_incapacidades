<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-bar dark class="bg-primary text-white">
        <q-icon name="delete" color="white" />
        <div class="col text-center text-weight-bold">
          {{title}}
        </div>
        <q-btn dense flat round icon="close" color="white" @click="onCancelClick" />
      </q-bar>
      <q-card-section>
        {{message}}
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn dense color="primary" flat label="Cancelar" @click="onCancelClick" />
        <q-btn dense color="negative" label="Eliminar" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    }
  },
  emits: [
    ...useDialogPluginComponent.emits
  ],
  setup () {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    return {
      dialogRef,
      onDialogHide,
      onOKClick () {
        onDialogOK()
      },
      onCancelClick: onDialogCancel
    }
  }
}
</script>
