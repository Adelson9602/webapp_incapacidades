<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      ref="myForm"
    >
      <div class="text-h6 q-px-sm">Datos de básicos</div>
      <create-person-component />
      <div class="text-h6 q-px-sm">Datos de contacto</div>
      <create-contact-component :employe-edit="employeEdit" />
      <div class="text-h6 q-px-sm">Datos de empleo</div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
          <q-select
            v-model="fkIdCargo"
            use-input
            input-debounce="0"
            label="Cargo"
            outlined
            :options="optionsPositions"
            @filter="filterPosition"
            option-value="idCargo"
            option-label="nombreCargo"
            map-options
            emit-value
            :rules="[(val) => !!val || 'Cargo es requerido']"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn icon="save" label="Guardar" type="submit" color="primary" />
      </div>
    </q-form>
  </transition>

  <q-inner-loading :showing="isLoading" class="full-height full-width">
    <q-spinner-gears size="100px" color="primary" />
    <p class="text-grey-6 text-body1">Por favor espere....</p>
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, toRefs } from 'vue';
import CreatePersonComponent from './CreatePersonComponent.vue';
import CreateContactComponent from '../general/CreateContactComponent.vue';
import { InformationEmploye, Position } from 'src/models/generals.models';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { useQuasar } from 'quasar';
import { employeStore } from 'stores/employe';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ComponentCreateEmploye',
  components: {
    CreatePersonComponent,
    CreateContactComponent,
  },
  props: {
    employeEdit: Object as PropType<InformationEmploye>,
  },
  emits: ['onReload'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const myForm = ref<any>(null);
    const fkIdCargo = ref<number>();

    const isLoading = ref(false);
    const positions = ref<Position[]>();
    const optionsPositions = ref<Position[]>();
    const { employeEdit } = toRefs(props);
    const { person, contact } = storeToRefs(employeStore());

    const getData = async () => {
      isLoading.value = true;
      try {
        const responsePosition = await get
          .getPosition()
          .then((response) => response.data);
        positions.value = [...responsePosition];
        optionsPositions.value = [...responsePosition];

        if (employeEdit.value) {
          fkIdCargo.value = Number(employeEdit.value.fkIdCargo);
        }
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const dataSend: InformationEmploye = {
          ...person.value,
          ...contact.value,
          fkIdCargo: Number(fkIdCargo.value),
          fkIdContacto: contact.value.idContacto,
          isEmploye: true,
          fkDocumentoPersona: person.value.documentoPersona,
        };
        const resCreate = await post
          .createPerson(dataSend)
          .then((response) => response.data);

        $q.notify({
          message: resCreate.message,
          type: 'positive',
          position: 'bottom-right',
        });
        emit('onReload');
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = (value: any) => {
      console.log(value);
    };

    const filterPosition = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsPositions.value = positions.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        optionsPositions.value = positions.value?.filter(
          (v) => v.nombreCargo.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    onMounted(() => getData());

    return {
      myForm,
      fkIdCargo,
      optionsPositions,
      isLoading,
      onSubmit,
      onReset,
      filterPosition,
    };
  },
});
</script>
