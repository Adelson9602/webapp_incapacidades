<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-input
        v-model="person.primerNombre"
        type="text"
        label="Primer nombre"
        outlined
        @update:model-value="
          (val) => {
            person.primerNombre = `${val}`.toUpperCase();
          }
        "
        :rules="[(val) => !!val || 'Primer nombre es requerido']"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-input
        v-model="person.segundoNombre"
        type="text"
        label="Segundo nombre"
        outlined
        @update:model-value="
          (val) => {
            person.segundoNombre = `${val}`.toUpperCase();
          }
        "
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-input
        v-model="person.primerApellido"
        type="text"
        label="Primer apellido"
        outlined
        @update:model-value="
          (val) => {
            person.primerApellido = `${val}`.toUpperCase();
          }
        "
        :rules="[(val) => !!val || 'Primer apellido es requerido']"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-input
        v-model="person.segundoApellido"
        type="text"
        label="Segundo apellido"
        outlined
        @update:model-value="
          (val) => {
            person.segundoApellido = `${val}`.toUpperCase();
          }
        "
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-select
        outlined
        v-model="person.fkIdTipoDocumento"
        :options="optionsDocumentTypes"
        label="Tipo documento"
        option-label="nombreTipoDocumento"
        option-value="idTipoDocumento"
        map-options
        emit-value
        :rules="[(val) => !!val || 'Tipo documento es requerido']"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-input
        v-model="person.documentoPersona"
        type="text"
        label="Número documento"
        outlined
        mask="#################"
        :rules="[(val) => !!val || 'Número documento es requerido']"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-input
        outlined
        v-model="person.fechaNacimiento"
        mask="date"
        :rules="['date']"
        label="Fecha nacimiento"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="person.fechaNacimiento">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
      <q-select
        outlined
        v-model="person.genero"
        :options="optionsGenres"
        label="Género"
        map-options
        emit-value
        :rules="[(val) => !!val || 'Género es requerido']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { get } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { employeStore } from 'stores/employe';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ComponentCreateEmploye',
  setup() {
    const optionsDocumentTypes = ref();
    const isLoading = ref(false);
    const optionsGenres = [
      {
        label: 'MASCULINO',
        value: 'M',
      },
      {
        label: 'FEMENINO',
        value: 'F',
      },
    ];
    const { person, isEdit } = storeToRefs(employeStore());

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDocuments = await get
          .getDocumentsType()
          .then((response: any) => response.data);
        optionsDocumentTypes.value = [...resDocuments];
      } catch (error: any) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    watch(
      () => person.value.documentoPersona,
      (value, oldValue) => {
        if (isEdit.value) {
          person.value.oldDocumentoPersona = Number(oldValue);
        }
      }
    );

    onMounted(() => getData());

    return {
      person,
      optionsGenres,
      optionsDocumentTypes,
    };
  },
});
</script>
