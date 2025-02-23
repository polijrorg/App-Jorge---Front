import P3_meninas_altura from '@services/DefaultCurves/P3_meninas_altura';
import P3_meninas_imc from '@services/DefaultCurves/P3_meninas_imc';
import P3_meninas_peso from '@services/DefaultCurves/P3_meninas_peso';
import P3_meninos_altura from '@services/DefaultCurves/P3_meninos_altura';
import P3_meninos_imc from '@services/DefaultCurves/P3_meninos_imc';
import P3_meninos_peso from '@services/DefaultCurves/P3_meninos_peso';
import P15_meninas_altura from '@services/DefaultCurves/P15_meninas_altura';
import P15_meninas_imc from '@services/DefaultCurves/P15_meninas_imc';
import P15_meninas_peso from '@services/DefaultCurves/P15_meninas_peso';
import P15_meninos_altura from '@services/DefaultCurves/P15_meninos_altura';
import P15_meninos_imc from '@services/DefaultCurves/P15_meninos_imc';
import P15_meninos_peso from '@services/DefaultCurves/P15_meninos_peso';
import P50_meninas_altura from '@services/DefaultCurves/P50_meninas_altura';
import P50_meninas_imc from '@services/DefaultCurves/P50_meninas_imc';
import P50_meninas_peso from '@services/DefaultCurves/P50_meninas_peso';
import P50_meninos_altura from '@services/DefaultCurves/P50_meninos_altura';
import P50_meninos_imc from '@services/DefaultCurves/P50_meninos_imc';
import P50_meninos_peso from '@services/DefaultCurves/P50_meninos_peso';
import P85_meninas_altura from '@services/DefaultCurves/P85_meninas_altura';
import P85_meninas_imc from '@services/DefaultCurves/P85_meninas_imc';
import P85_meninas_peso from '@services/DefaultCurves/P85_meninas_peso';
import P85_meninos_altura from '@services/DefaultCurves/P85_meninos_altura';
import P85_meninos_imc from '@services/DefaultCurves/P85_meninos_imc';
import P85_meninos_peso from '@services/DefaultCurves/P85_meninos_peso';
import P97_meninas_altura from '@services/DefaultCurves/P97_meninas_altura';
import P97_meninas_imc from '@services/DefaultCurves/P97_meninas_imc';
import P97_meninas_peso from '@services/DefaultCurves/P97_meninas_peso';
import P97_meninos_altura from '@services/DefaultCurves/P97_meninos_altura';
import P97_meninos_imc from '@services/DefaultCurves/P97_meninos_imc';
import P97_meninos_peso from '@services/DefaultCurves/P97_meninos_peso';

const datasets = {
  feminino: {
    altura: {
      P3: P3_meninas_altura,
      P15: P15_meninas_altura,
      P50: P50_meninas_altura,
      P85: P85_meninas_altura,
      P97: P97_meninas_altura,
    },
    imc: {
      P3: P3_meninas_imc,
      P15: P15_meninas_imc,
      P50: P50_meninas_imc,
      P85: P85_meninas_imc,
      P97: P97_meninas_imc,
    },
    peso: {
      P3: P3_meninas_peso,
      P15: P15_meninas_peso,
      P50: P50_meninas_peso,
      P85: P85_meninas_peso,
      P97: P97_meninas_peso,
    },
  },
  masculino: {
    altura: {
      P3: P3_meninos_altura,
      P15: P15_meninos_altura,
      P50: P50_meninos_altura,
      P85: P85_meninos_altura,
      P97: P97_meninos_altura,
    },
    imc: {
      P3: P3_meninos_imc,
      P15: P15_meninos_imc,
      P50: P50_meninos_imc,
      P85: P85_meninos_imc,
      P97: P97_meninos_imc,
    },
    peso: {
      P3: P3_meninos_peso,
      P15: P15_meninos_peso,
      P50: P50_meninos_peso,
      P85: P85_meninos_peso,
      P97: P97_meninos_peso,
    },
  },
};

export default datasets;
