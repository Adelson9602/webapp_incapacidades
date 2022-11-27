<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-card-section class="q-pb-none">
        <q-btn
          color="primary"
          icon="add"
          label="agregar tipo documento"
          @click="dialog = true"
        />
        <q-dialog v-model="dialog" persistent>
          <q-card style="width: 450px; max-width: 90vw">
            <q-bar dark class="bg-primary text-white">
              <q-btn dense flat round icon="list" color="white" />
              <div class="col text-center text-weight-bold">
                {{ documentType.idTipoDocumento ? 'Editar ' : 'Agregar ' }}tipo
                documento
              </div>
              <q-btn
                dense
                flat
                round
                icon="close"
                color="white"
                v-close-popup
              />
            </q-bar>
            <q-card-section>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                ref="myForm"
              >
                <q-input
                  v-model="documentType.nombreTipoDocumento"
                  outlined
                  type="text"
                  label="Nombre tipo de documento"
                  :rules="[
                    (val) => !!val || 'Nombre tipo documento es requerido',
                  ]"
                />
                <div class="row justify-end">
                  <q-btn label="Guardar" type="submit" color="primary" />
                  <q-btn
                    label="Cancelar"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card-section>
      <general-table-component
        :columns="columns"
        title="Tipos de documento"
        :rows="rows"
        :grid="true"
        @on-edit="onEdit"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { DocumentType } from 'src/models/generals.models';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { QTableColumn, useQuasar } from 'quasar';

const columns: QTableColumn[] = [
  {
    name: 'idTipoDocumento',
    label: 'ID TIPO DOCUMENTO',
    align: 'center',
    sortable: true,
    field: 'idTipoDocumento',
  },
  {
    name: 'nombreTipoDocumento',
    label: 'TIPO DOCUMENTO',
    align: 'center',
    sortable: true,
    field: 'nombreTipoDocumento',
  },
];
export default defineComponent({
  name: 'PageTypeDocument',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<DocumentType[]>([]);
    const isLoading = ref(false);
    const dialog = ref(false);
    const myForm = ref<any>(null);
    const documentType = ref({
      idTipoDocumento: 0,
      nombreTipoDocumento: '',
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        const resTypeDoc = await get
          .getDocumentsType()
          .then((response) => response.data);
        rows.value = [
          ...resTypeDoc.map((documentType) => {
            documentType.title = documentType.nombreTipoDocumento;
            documentType.btnEdit = true;
            return documentType;
          }),
        ];
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const resTypeDoc = await post
          .createDocumentType(documentType.value)
          .then((response) => response.data);

        $q.notify({
          message: resTypeDoc.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        documentType.value = {
          idTipoDocumento: 0,
          nombreTipoDocumento: '',
        };
        dialog.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      documentType.value = {
        idTipoDocumento: 0,
        nombreTipoDocumento: '',
      };
      myForm.value.resetValidation();
      dialog.value = false;
    };

    const onEdit = (row: DocumentType) => {
      documentType.value = row;
      dialog.value = true;
    };

    onMounted(() => getData());

    return {
      columns,
      rows,
      dialog,
      documentType,
      myForm,
      onSubmit,
      onReset,
      onEdit,
    };
  },
});
</script>
