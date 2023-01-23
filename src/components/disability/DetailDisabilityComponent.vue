<template>
  <q-card>
    <q-bar dark class="bg-primary text-white">
      <q-icon dense round name="list" color="white" />
      <div class="col text-center text-weight-bold">
        Detalle de incapacidad No. {{ disability?.radicado }}
      </div>
      <q-btn dense flat round icon="close" color="white" v-close-popup />
    </q-bar>
    <q-card-section
      class="row q-pb-none"
      v-for="(item, key) in disabilityDetail"
      :key="key"
    >
      <div class="col-xs-12 text-h6 text-grey-8 text-weight-light">
        {{ `${key}` == 'employe' ? 'Datos de empleado' : 'Datos empresa' }}
      </div>
      <div
        class="col-xs-12 col-sm-6 col-md-3 col-lg-2 q-pa-xs"
        v-for="(sbItem, key) in item"
        :key="key"
      >
        <q-field :label="`${key}`" stack-label dense>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ sbItem }}
            </div>
          </template>
        </q-field>
      </div>
    </q-card-section>
    <q-card-section v-if="prorroga && prorroga.length > 0">
      <div class="text-h6 text-grey-8 text-weight-light q-mb-md">Prorrogas</div>
      <q-table
        :rows="prorroga"
        flat
        :columns="columnsProrroga"
        row-key="name"
      />
    </q-card-section>
    <q-card-section v-if="files && files.length > 0">
      <div class="text-h6 text-grey-8 text-weight-light q-mb-md">
        Archivos adjuntos
      </div>
      <q-list bordered separator>
        <q-item v-for="(file, index) in files" :key="index">
          <q-item-section>
            {{ file.nombreArchivo }}
          </q-item-section>
          <q-item-section avatar>
            <q-icon
              class="cursor-pointer"
              color="primary"
              name="download_for_offline"
              @click="openURL(`//${file.url}`)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section v-if="history.length > 0">
      <div class="text-h6 text-grey-8 text-weight-light q-mb-md">
        Histórico de incapacidad
      </div>
      <q-table :rows="history" flat :columns="columnsHistory" row-key="name" />
    </q-card-section>
    <q-card-actions vertical align="right">
      <q-btn flat label="Ok" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { PropType } from 'vue';
import {
  Adjunto,
  DesabilityDetail,
  DisabilityExtension,
  HistoricalDisability,
  InformationDisability,
} from 'src/models/generals.models';
import { QTableColumn, openURL } from 'quasar';

const columnsProrroga: QTableColumn[] = [
  {
    name: 'idProrrogaIncapacidad',
    align: 'center',
    label: '#',
    sortable: true,
    field: 'idProrrogaIncapacidad',
  },
  {
    name: 'fechaIniciaProrroga',
    align: 'center',
    label: 'FECHA PRORROGA',
    sortable: true,
    field: 'fechaIniciaProrroga',
  },
  {
    name: 'fechaFinProrroga',
    align: 'center',
    label: 'FECHA FIN PRORROGA',
    sortable: true,
    field: 'fechaFinProrroga',
  },
  {
    name: 'diasProrroga',
    align: 'center',
    label: 'DÍAS PRORROGA',
    sortable: true,
    field: 'diasProrroga',
  },
  {
    name: 'ibc',
    align: 'center',
    label: 'IBC',
    sortable: true,
    field: 'ibc',
  },
  {
    name: 'valor',
    align: 'center',
    label: 'VALOR',
    sortable: true,
    field: 'valor',
  },
  {
    name: 'observacion',
    align: 'center',
    label: 'OBSERVACIÓN',
    sortable: true,
    field: 'observacion',
  },
  {
    name: 'usuario',
    align: 'center',
    label: 'USUARIO',
    sortable: true,
    field: 'usuario',
  },
];

const columnsHistory: QTableColumn[] = [
  {
    name: 'idHistorico',
    align: 'center',
    label: 'ID',
    sortable: true,
    field: 'idHistorico',
  },
  {
    name: 'usuario',
    align: 'center',
    label: 'USUARIO',
    sortable: true,
    field: 'usuario',
  },
  {
    name: 'nombres',
    align: 'center',
    label: 'NOMBRES',
    sortable: true,
    field: 'nombres',
  },
  {
    name: 'observaciones',
    align: 'center',
    label: 'OBSERVACIONES',
    sortable: true,
    field: 'observaciones',
  },
];

export default {
  name: 'DetailDisbailityComponent',
  props: {
    disabilityDetail: {
      type: Object as PropType<DesabilityDetail>,
      required: true,
    },
    prorroga: {
      type: Array as PropType<DisabilityExtension[]>,
      required: true,
    },
    history: {
      type: Array as PropType<HistoricalDisability[]>,
      required: true,
    },
    disability: {
      type: Object as PropType<InformationDisability>,
      required: true,
    },
    files: {
      type: Array as PropType<Adjunto[]>,
      required: true,
    },
  },
  setup() {
    return {
      columnsProrroga,
      columnsHistory,
      openURL,
    };
  },
};
</script>

<style></style>
