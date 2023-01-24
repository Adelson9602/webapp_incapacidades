<template>
  <q-page padding>
    <!-- content -->
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        name="disabilities"
        label="Tipos de incapacidad"
        v-if="actions.leer"
      />
      <q-tab
        name="type_disability"
        label="Documentos de incapcaidad"
        v-if="actions.leer"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="disabilities">
        <q-card flat>
          <q-card-section class="q-pb-none">
            <q-btn
              color="primary"
              icon="add"
              label="agregar tipo incapacidad"
              @click="dialog = true"
              v-if="actions.insert"
            />
            <!-- Dialogo para crear o editar  -->
            <q-dialog v-model="dialog" persistent>
              <q-card style="width: 450px; max-width: 90vw">
                <q-bar dark class="bg-primary text-white">
                  <q-btn dense flat round icon="list" color="white" />
                  <div class="col text-center text-weight-bold">
                    {{
                      disabilityType.idTipoIncapacidad ? 'Editar ' : 'Agregar '
                    }}tipo incapacidad
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
                      v-model="disabilityType.nombreTipoIncapacidad"
                      outlined
                      type="text"
                      label="Nombre tipo de incapacidad"
                      :rules="[
                        (val) =>
                          !!val || 'Nombre tipo incapacidad es requerido',
                      ]"
                      @update:model-value="
                        (val) => {
                          disabilityType.nombreTipoIncapacidad =
                            `${val}`.toUpperCase();
                        }
                      "
                    />
                    <q-input
                      v-model="disabilityType.codigoDianostico"
                      outlined
                      type="text"
                      label="Código diagnóstico"
                      :rules="[
                        (val) => !!val || 'Código diagnóstico es requerido',
                      ]"
                      @update:model-value="
                        (val) => {
                          disabilityType.codigoDianostico =
                            `${val}`.toUpperCase();
                        }
                      "
                    />
                    <div class="row justify-end">
                      <q-btn label="Guardar" type="submit" color="primary" />
                      <q-btn
                        label="Cancelar"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                        v-close-popup
                      />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>

            <!-- Dialogo para ver los tipos de documentos asociados -->
            <q-dialog v-model="dialogAssociatedDocuments" persistent>
              <q-card style="width: 480px; max-width: 90vw">
                <q-bar dark class="bg-primary text-white">
                  <q-icon name="list" />
                  <div class="col text-center text-weight-bold">
                    Tipos de documentos asociados
                  </div>
                  <q-btn flat round icon="close" v-close-popup />
                </q-bar>
                <q-card-section>
                  <q-list bordered separator>
                    <q-item v-for="(item, key) in typeDocuments" :key="key">
                      <q-item-section>{{ item.label }}</q-item-section>
                      <q-item-section side>
                        <q-toggle
                          color="positive"
                          v-model="item.selected"
                          val="battery"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Cancelar" color="primary" v-close-popup />
                  <q-btn
                    label="Guardar"
                    color="primary"
                    @click="onRelations"
                    :loading="isLoading"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </q-card-section>
          <general-table-component
            :columns="columns"
            title="Tipos de incapacidad"
            :rows="rows"
            :grid="true"
            @on-edit="onEdit"
            @on-detail="onDetail"
          />
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="type_disability">
        <q-card-section class="q-pb-none">
          <q-btn
            color="primary"
            icon="add"
            label="agregar tipo incapacidad"
            @click="dialogDocumentAttach = true"
            v-if="actions.insert"
          />
          <q-dialog v-model="dialogDocumentAttach" persistent>
            <q-card style="width: 450px; max-width: 90vw">
              <q-bar dark class="bg-primary text-white">
                <q-btn dense flat round icon="list" color="white" />
                <div class="col text-center text-weight-bold">
                  {{
                    disabilityType.idTipoIncapacidad ? 'Editar ' : 'Agregar '
                  }}tipo documento
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
                  @submit="onCreateDocument"
                  @reset="onReset"
                  class="q-gutter-md"
                  ref="myForm"
                >
                  <q-input
                    v-model="documentAttach.documento"
                    outlined
                    type="text"
                    label="Nombre documento"
                    :rules="[(val) => !!val || 'Nombre documento es requerido']"
                    @update:model-value="
                      (val) => {
                        documentAttach.documento =
                          `${val}`.charAt(0).toUpperCase() + `${val}`.slice(1);
                      }
                    "
                  />
                  <q-input
                    v-model="documentAttach.descripcion"
                    outlined
                    type="textarea"
                    label="Descripción"
                  />
                  <div class="row justify-end">
                    <q-btn label="Guardar" type="submit" color="primary" />
                    <q-btn
                      label="Cancelar"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                      v-close-popup
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-card-section>
        <general-table-component
          :columns="columnsDocuments"
          title="Tipos de documentos"
          :rows="rowsDocuments"
          :grid="true"
          @on-edit="onEditDocument"
          @on-detail="onDetailDocument"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import {
  Actions,
  DisabilityType,
  TypeDocumentsAttach,
  Modulo,
  DocumentsAttachSave,
} from 'src/models/generals.models';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { QTableColumn, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const columns: QTableColumn[] = [
  {
    name: 'idTipoIncapacidad',
    label: 'ID TIPO INCAPACIDAD',
    align: 'center',
    sortable: true,
    field: 'idTipoIncapacidad',
  },
  {
    name: 'nombreTipoIncapacidad',
    label: 'TIPO INCAPACIDAD',
    align: 'center',
    sortable: true,
    field: 'nombreTipoIncapacidad',
  },
  {
    name: 'codigoDianostico',
    label: 'CÓDIGO DIAGNÓSTICO',
    align: 'center',
    sortable: true,
    field: 'codigoDianostico',
  },
];

const columnsDocuments: QTableColumn[] = [
  {
    name: 'idDocumentoAdjuntar',
    label: 'ID',
    align: 'center',
    sortable: true,
    field: 'idDocumentoAdjuntar',
  },
  {
    name: 'documento',
    label: 'DOCUMENTO',
    align: 'center',
    sortable: true,
    field: 'documento',
  },
  {
    name: 'descripcion',
    label: 'DESCRIPCIÓN',
    align: 'center',
    sortable: true,
    field: 'descripcion',
  },
];
export default defineComponent({
  name: 'PageTypeDocument',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<DisabilityType[]>([]);
    const rowsDocuments = ref<TypeDocumentsAttach[]>([]);
    const isLoading = ref(false);
    const dialog = ref(false);
    const dialogAssociatedDocuments = ref(false);
    const dialogDocumentAttach = ref(false);
    const myForm = ref<any>(null);
    const disabilityType = ref<DisabilityType>({
      idTipoIncapacidad: null,
      nombreTipoIncapacidad: '',
      codigoDianostico: '',
    });
    const permisos = $q.localStorage.getItem('permisos') as Modulo[];
    const { currentRoute } = useRouter();
    const actions = ref<Actions>({
      borrar: false,
      insert: false,
      leer: false,
      update: false,
    });
    const tab = ref('disabilities');
    const documentAttach = ref<TypeDocumentsAttach>({
      documento: '',
      descripcion: '',
      idDocumentoAdjuntar: null,
    });
    const typeDocuments = ref<DocumentsAttachSave[]>([]);

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDisabilityType = await get
          .getDisabilityType()
          .then((response) => response.data);
        rows.value = [
          ...resDisabilityType.map((disabilityType) => {
            disabilityType.title = disabilityType.nombreTipoIncapacidad;
            disabilityType.btnEdit = true;
            disabilityType.btnDetail = true;
            return disabilityType;
          }),
        ];

        const resTypeDocuments = await get
          .getTypeOfDocumentToAttach()
          .then((response) => response.data);
        rowsDocuments.value = [
          ...resTypeDocuments.map((disabilityType) => {
            disabilityType.title = disabilityType.documento;
            disabilityType.btnEdit = true;
            disabilityType.btnDetail = true;
            return disabilityType;
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
          .createDisabilityType(disabilityType.value)
          .then((response) => response.data);

        $q.notify({
          message: resTypeDoc.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        disabilityType.value = {
          idTipoIncapacidad: 0,
          nombreTipoIncapacidad: '',
          codigoDianostico: '',
        };
        dialog.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onCreateDocument = async () => {
      isLoading.value = true;
      try {
        const resTypeDoc = await post
          .createTypeOfDocumentToAttach(documentAttach.value)
          .then((response) => response.data);

        $q.notify({
          message: resTypeDoc.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        documentAttach.value = {
          documento: '',
          descripcion: '',
          idDocumentoAdjuntar: null,
        };
        dialogDocumentAttach.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      disabilityType.value = {
        idTipoIncapacidad: 0,
        nombreTipoIncapacidad: '',
        codigoDianostico: '',
      };
      myForm.value.resetValidation();
      dialog.value = false;
    };

    const onEdit = (row: DisabilityType) => {
      disabilityType.value = row;
      dialog.value = true;
    };

    const onEditDocument = (row: TypeDocumentsAttach) => {
      documentAttach.value = row;
      dialogDocumentAttach.value = true;
    };

    const onDetailDocument = (row: TypeDocumentsAttach) => {
      documentAttach.value = row;
      dialogDocumentAttach.value = true;
    };

    const onDetail = async (row: DisabilityType) => {
      try {
        const id = row.idTipoIncapacidad ? row.idTipoIncapacidad : 0;
        const { data } = await get.getDocumentsAttachByDisabilityType(id);

        typeDocuments.value = [
          ...rowsDocuments.value.map((e) => {
            const res = data.find(
              (i) => i.idTipoDocumentoAdjuntar == e.idDocumentoAdjuntar
            );
            return {
              label: e.documento,
              idTipoDocumentoAdjuntar: e.idDocumentoAdjuntar || 0,
              idTipoIncapacidad: id,
              selected: res ? true : false,
            };
          }),
        ];

        dialogAssociatedDocuments.value = true;
      } catch (error) {
        controlError(error);
      } finally {
      }
    };

    const onRelations = async () => {
      isLoading.value = true;
      try {
        const dataSelected = typeDocuments.value.filter((e) => e.selected);
        const { data } = await post.createDocumentToAttach(dataSelected);

        $q.notify({
          message: data.message,
          type: 'positive',
          position: 'bottom-right',
        });
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    watch(dialog, (value) => {
      if (!value) {
        disabilityType.value = {
          idTipoIncapacidad: null,
          nombreTipoIncapacidad: '',
          codigoDianostico: '',
        };
      }
    });

    watch(dialogDocumentAttach, (value) => {
      if (!value) {
        documentAttach.value = {
          documento: '',
          descripcion: '',
          idDocumentoAdjuntar: null,
        };
      }
    });

    onMounted(() => {
      getData();

      // Validamos las acciones del usuario, permisos que tiene asignado
      const currentPath = currentRoute.value.path;
      permisos.forEach((p) => {
        const path = p.items.find((i) => i.route == currentPath);
        if (path) {
          actions.value = { ...path.actions };
        }
      });
    });

    return {
      columns,
      rows,
      columnsDocuments,
      rowsDocuments,
      dialog,
      disabilityType,
      myForm,
      actions,
      tab,
      dialogDocumentAttach,
      documentAttach,
      dialogAssociatedDocuments,
      typeDocuments,
      isLoading,
      onSubmit,
      onReset,
      onEdit,
      onCreateDocument,
      onEditDocument,
      onDetailDocument,
      onDetail,
      onRelations,
    };
  },
});
</script>
