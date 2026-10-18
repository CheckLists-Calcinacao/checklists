/* =====================================================================
   CONTEÚDO DOS CHECKLISTS
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa mexer para:
     - mudar o texto de uma pergunta
     - incluir / remover perguntas
     - mudar as letras das equipes
   Depois de editar, aumente o número da VERSAO_APP (logo abaixo) para
   o tablet baixar a atualização.

   Formato de cada pergunta:  ['número', 'texto da pergunta', {opções}]
     {op:'SN'}   Sim / Não  (padrão, não precisa escrever)
     {op:'SEF'}  Sim / Excesso / Falta
     {op:'NSQ'}  Não / Sim + campo "Qual?"
     {op:'CNC'}  Conforme / Não conforme + campo "Motivo"
     {op:'KK'}   K1 / K2
     {op:'AB'}   Adequado / Baixo
     {opcoes:['A','B']}  lista própria de opções
     {inv: true}  pergunta em que o NORMAL é "Não" (ex.: "Há vazamento?"):
                  Não fica verde e Sim fica vermelho. Sem isso, Sim = verde e Não = vermelho.
                  Nas perguntas Não/Sim + "Qual?" o normal já é "Não".
     {cols:['Skid','Área do queimador']}  colunas próprias só nessa pergunta
   ===================================================================== */

const VERSAO_APP = '2.4.0';

const CONFIG = {
  equipes: ['ADM', 'A', 'B', 'C', 'D'],
  turnos: ['07 às 19', '19 às 07'],
  empresa: 'Anglo American',
  local: 'Barro Alto · Calcinação e Pulverização'
};

/* Áreas da tela inicial: título, cor da barrinha e ordem.
   Cada checklist (e cada link) diz a sua área no campo "area". */
const AREAS = [
  { id: 'calcinacao', nome: 'Calcinadores', cor: '#C2410C' },
  { id: 'pulverizacao', nome: 'Pulverização', cor: '#1D4ED8' },
  { id: 'granulometria', nome: 'Granulometria', cor: '#0F766E' }
];

const OPCOES = {
  SN: ['Sim', 'Não'],
  SEF: ['Sim', 'Excesso', 'Falta'],
  NSQ: ['Não', 'Sim'],
  CNC: ['Conforme', 'Não conforme'],
  KK: ['K1', 'K2'],
  AB: ['Adequado', 'Baixo']
};

const K = ['K1', 'K2'];

const CHECKLISTS = [
  /* ------------------------------------------------------------------ */
  {
    id: 'fornos',
    area: 'calcinacao',
    nome: 'Fornos Calcinadores',
    arquivo: 'Fornos_Calcinadores',
    sigla: 'FOR',
    cor: '#C2410C',
    campos: ['data', 'turno', 'equipe'],
    assinatura: false,
    secoes: [
      { t: '1 - Verificação do ID FAN', cols: K, verif: K, obs: true, itens: [
        ['1.1', 'O nível de óleo do redutor está dentro dos limites?'],
        ['1.2', 'Há vazamento de óleo/água nos mancais ou unidade hidráulica?', { inv: true }],
        ['1.3', 'Há ocorrência de ruídos/vibrações no ventilador?', { inv: true }]
      ]},
      { t: '2 - Verificação dos sistemas de transporte', obs: true, itens: [
        ['2.1', 'Há vazamentos?', { inv: true }]
      ]},
      { t: '3 - Verificação das baias e caçambas de pó', cols: K, obs: true, itens: [
        ['3.1', 'As baias de pó estão cheias?', { inv: true }],
        ['3.2', 'As caçambas estão cheias?', { inv: true }],
        ['3.3', 'As áreas da câmara de fumaça estão isoladas?']
      ]},
      { t: '4 - Verificação do fluxocooler', cols: K, verif: K, obs: true, itens: [
        ['4.1', 'Há vazamento de pó ou água no fluxocooler?', { inv: true }],
        ['4.2', 'A pressão de trabalho está em 14 kPa?']
      ]},
      { t: '5 - Verificação do chute de alimentação e sistema de resfriamento de gases', cols: K, verif: K, obs: true, itens: [
        ['5.1', 'A região do chute de alimentação se encontra limpa?'],
        ['5.2', 'Os portões de acesso ao chute se encontram fechados?'],
        ['5.3', 'As temperaturas do ciclone estão abaixo de 370 °C?'],
        ['5.4', 'Os bicos estão entupidos?', { inv: true }]
      ]},
      { t: '6 - Verificação do sistema de lubrificação do selo de alimentação', cols: K, verif: K, obs: true, itens: [
        ['6.1', 'A lubrificação do selo está adequada?', { op: 'SEF' }],
        ['6.2', 'Há vazamento de ar ou graxa?', { inv: true }]
      ]},
      { t: '7 - Verificação dos mancais', verif: K, obs: true, grupos: [
        { nome: 'Forno K1', itens: [
          ['7.1', 'Há algum mancal com temperatura maior que 60 °C?', { op: 'NSQ' }],
          ['7.2', 'Há diferença maior que 10 °C entre mancais próximos?', { op: 'NSQ' }],
          ['7.3', 'Há vazamento de óleo nos mancais?', { op: 'NSQ' }],
          ['7.4', 'Há mancal com nível de óleo fora do especificado?', { op: 'NSQ' }],
          ['7.5', 'Há falta de refrigeração em algum mancal?', { op: 'NSQ' }]
        ]},
        { nome: 'Forno K2', itens: [
          ['7.1', 'Há algum mancal com temperatura maior que 65 °C?', { op: 'NSQ' }],
          ['7.2', 'Há diferença maior que 10 °C entre mancais próximos?', { op: 'NSQ' }],
          ['7.3', 'Há vazamento de óleo nos mancais?', { op: 'NSQ' }],
          ['7.4', 'Há mancal com nível de óleo fora do especificado?', { op: 'NSQ' }],
          ['7.5', 'Há falta de refrigeração em algum mancal?', { op: 'NSQ' }]
        ]}
      ]},
      { t: '8 - Verificação no trust roller', cols: K, verif: K, obs: true, itens: [
        ['8.1', 'A posição axial está dentro dos limites? Padrão -5 < x < 5'],
        ['8.2', 'A pressão do óleo está dentro dos limites (50 bar máx)?'],
        ['8.3', 'Há marcações no rolo de encosto ou anel de rodamento?', { inv: true }],
        ['8.4', 'Há vazamento de óleo no sistema hidráulico?', { inv: true }]
      ]},
      { t: '9 - Verificação dos redutores', cols: K, verif: K, obs: true, itens: [
        ['9.1', 'O nível de óleo dos redutores está dentro dos limites?'],
        ['9.2', 'Se verifica a ocorrência de ruídos, batidas, etc?', { inv: true }],
        ['9.3', 'Foi verificado/limpo o filtro da linha de água?'],
        ['9.4', 'A temperatura está dentro dos limites? Padrão 70 °C máx'],
        ['9.5', 'A pressão está entre 1,0 e 5,5 bar?']
      ]},
      { t: '10 - Verificação da região do queimador e ventiladores primário, secundário e terciário', cols: K, verif: K, obs: true, itens: [
        ['10.1', 'Está ocorrendo retorno de óleo no maçarico?', { inv: true }],
        ['10.2', 'Há acúmulo de pó no piso do maçarico?', { inv: true }],
        ['10.3', 'Há vazamento de GLP na região do maçarico?', { inv: true }],
        ['10.4', 'Se verificou ruído anormal em algum ventilador?', { inv: true }],
        ['10.5', 'As grelhas e selos da saída do forno estão normais?'],
        ['10.6', 'Há pontos quentes na carcaça do forno?', { inv: true }],
        ['10.7', 'Há tambores de óleo para serem retirados?', { cols: ['Skid', 'Área do queimador'], inv: true }],
        ['10.8', 'A sala dos pfisters se encontra limpa?']
      ]},
      { t: '11 - Verificação da área de amostragem', cols: K, verif: K, obs: true, itens: [
        ['11.1', 'Os portões de acesso se encontram fechados?'],
        ['11.2', 'A proteção das agulhas se encontra no local e em bom estado?'],
        ['11.3', 'Os tubos de amostragem estão obstruídos?', { inv: true }]
      ]},
      { t: '12 - Verificação da baia de anel', verif: ['Verificador'], obs: true, itens: [
        ['12.1', 'Os portões de acesso às baias estão fechados?'],
        ['12.2', 'A baia de anel encontra-se isolada?']
      ]},
      { t: '13 - Verificação das áreas 410 e 711', verif: ['Área 410', 'Área 711'], obs: true, grupos: [
        { nome: 'Área 410', itens: [
          ['13.1', 'O kit de contenção de óleo se encontra no local?'],
          ['13.2', 'A FISPQ do prodol e do óleo 1A se encontram no local?'],
          ['13.3', 'Há tambores de óleo para serem retirados?', { inv: true }],
          ['13.4', 'Foi realizada a limpeza dos filtros?'],
          ['13.5', 'Há vazamento de óleo na área das bombas e/ou no 410-TQ-001?', { inv: true }],
          ['13.6', 'Há vazamento de óleo na área dos aquecedores?', { inv: true }],
          ['13.7', 'Qual o circuito de operação?', { op: 'KK', cols: ['Bomba', 'Aquecedor'] }]
        ]},
        { nome: 'Área 711', itens: [
          ['13.8', 'O kit de contenção de óleo se encontra no local?'],
          ['13.9', 'Há vazamento de óleo no local?', { inv: true }],
          ['13.10', 'Há tambores de óleo para serem retirados?', { inv: true }],
          ['13.11', 'A temperatura de óleo na bomba está OK? Padrão < 65 °C']
        ]}
      ]},
      { t: '14 - Verificações dos compressores', verif: ['Verificador'], obs: true, itens: [
        ['14.1', 'Todos os compressores estão ligados e em rede?'],
        ['14.2', 'Há alarme nos painéis dos compressores?', { inv: true }],
        ['14.3', 'Combustível do compressor diesel', { op: 'AB' }],
        ['14.4', 'O compressor diesel está ligado em modo automático?'],
        ['14.5', 'O teste de funcionamento do compressor diesel foi positivo?'],
        ['14.6', 'Os compressores estão drenando água?'],
        ['14.7', 'Há vazamentos de ar e/ou óleo?', { inv: true }]
      ]}
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'pulverizacao',
    area: 'pulverizacao',
    nome: 'Planta de Pulverização de Carvão',
    arquivo: 'Pulverizacao_Carvao',
    sigla: 'PUL',
    cor: '#1D4ED8',
    campos: ['data', 'turno', 'equipe'],
    assinatura: true,
    secoes: [
      { t: '1 - Verificação Ar Instrumento, Nitrogênio, Água de refrigeração e Combate Incêndio', obs: true, itens: [
        ['1.1', 'Pressão do ar de instrumento na planta está normal? (ideal 7 kgf)'],
        ['1.2', 'Ar da central de compressores está alinhado?'],
        ['1.3', 'Compressor da planta está operando normalmente?'],
        ['1.4', 'Purgadores do compressor e do balão de ar estão funcionando normalmente?'],
        ['1.5', 'Há algum vazamento de ar de instrumento na planta?', { inv: true }],
        ['1.6', 'Pressão do Nitrogênio está normal? (ideal 7 a 8 kgf na rede e 11 a 13 kgf no balão N2)'],
        ['1.7', 'Há algum vazamento de N2 na planta de pulverização?', { inv: true }],
        ['1.8', 'Água de refrigeração dos equipamentos está normal?'],
        ['1.9', 'Há vazamento de água de refrigeração?', { inv: true }]
      ]},
      { t: '2 - Verificação do Moinho 771-MO-001', obs: true, itens: [
        ['2.1', 'Nível de óleo do redutor e unidade 771-UH-002 está acima do nível mínimo?'],
        ['2.2', 'Há vazamento de óleo no redutor ou unidade hidráulica?', { inv: true }],
        ['2.3', 'Temperatura e pressão de água no trocador de calor está normal?'],
        ['2.4', 'Há ocorrência de ruídos/vibrações no moinho, pêndulas, redutor e motor?', { inv: true }],
        ['2.5', 'Pressão óleo das pêndulas está normal? (ideal entre 60 e 75 bar)'],
        ['2.6', 'Nível óleo na unidade 771-UH-001 está acima do nível mínimo?'],
        ['2.7', 'Há vazamento de óleo na unidade hidráulica ou conexões das pêndulas?', { inv: true }],
        ['2.8', 'Nível de óleo na unidade 771-UH-003 do Classificador está acima do nível mínimo?'],
        ['2.9', 'Há ruídos, vibrações e vazamentos de óleo no redutor e motor do Classificador?', { inv: true }],
        ['2.10', 'Ventilador ar selagem para mesa do moinho, pêndulas e classificador está normal?'],
        ['2.11', 'Caixa de rejeito do moinho está limpa?'],
        ['2.12', 'Vedação da caixa de rejeito e porta de visitas do moinho está normal?'],
        ['2.13', 'Válvulas manuais na linha de N2 para moinho estão abertas?'],
        ['2.14', 'As caçambas de recolhimento de carvão estão vazias?']
      ]},
      { t: '3 - Verificação do Ventilador 771-VE-004', obs: true, itens: [
        ['3.1', 'Há ocorrência de ruído ou vibração anormal no ventilador?', { inv: true }],
        ['3.2', 'Temperatura e vibração dos mancais do ventilador estão normais?'],
        ['3.3', 'Juntas de entrada e saída do ventilador estão normais?'],
        ['3.4', 'Há entrada de ar ou vazamentos nas tubulações ou no ventilador?', { inv: true }]
      ]},
      { t: '4 - Verificação Transportes Pneumáticos e Compressores 771-CB-001 A, 771-CB-001 B e 771-CB-001 R', obs: true, itens: [
        ['4.1', 'Há ocorrência de ruído ou vibração anormal nos compressores?', { inv: true }],
        ['4.2', 'Nível óleo nos reservatórios dos compressores está normal? (ideal metade régua)'],
        ['4.3', 'Há algum vazamento de óleo/água nos compressores ou unidades hidráulicas?', { inv: true }],
        ['4.4', 'Qual compressor está alinhado para transporte Prepcarga?', { opcoes: ['771-CB-001 A', '771-CB-001 R'] }],
        ['4.5', 'Qual compressor está alinhado para transporte Calcinação?', { opcoes: ['771-CB-001 B', '771-CB-001 R'] }],
        ['4.6', 'Porta da sala dos compressores está fechada?'],
        ['4.7', 'Pressão ar de selagem e transporte estão normais?'],
        ['4.8', 'Há algum vazamento de carvão nos transportes pneumáticos?', { inv: true }],
        ['4.9', 'As moegas estão ficando pressurizadas (> 0 bar)?'],
        ['4.10', 'Há a necessidade de drenagem de óleo dos compressores?', { inv: true }]
      ]},
      { t: '5 - Verificação do Gerador de gases quentes 771-GS-001', obs: true, itens: [
        ['5.1', 'Caçamba de cinzas está vazia?'],
        ['5.2', 'Há vazamento de GLP?', { inv: true }],
        ['5.3', 'Pressão do ar do ignitor está normal?'],
        ['5.4', 'Ar de refrigeração dos instrumentos está aberto com as devidas pressões ajustadas?'],
        ['5.5', 'Posição das válvulas manuais ventilador combustão estão 100% Radial e 100% Axial?'],
        ['5.6', 'Ventiladores ar de Combustão e Diluição operam normalmente?'],
        ['5.7', 'Há água suficiente no borbulhador?'],
        ['5.8', 'Durante operação a chama esteve normal?'],
        ['5.9', 'Válvulas de N2 estão abertas para GGQ?'],
        ['5.10', 'Os visores de inspeção de chama estão limpos e íntegros?'],
        ['5.11', 'O analisador de gases O2 e CO na saída do GGQ está operando normalmente?']
      ]},
      { t: '6 - Verificação da Peneira 771-PE-001 e Amostrador 771-AM-001', obs: true, itens: [
        ['6.1', 'Caçamba de descarte da peneira está vazia?'],
        ['6.2', 'A peneira está em operação normal?'],
        ['6.3', 'Há algum vazamento na peneira?', { inv: true }],
        ['6.4', 'O amostrador foi drenado?'],
        ['6.5', 'As amostras foram coletadas e enviadas ao laboratório?']
      ]},
      { t: '7 - Verificação do silo de carvão moído 771-SL-003', obs: true, itens: [
        ['7.1', 'O silo de carvão moído está cheio? (ideal 100 a 150 t)'],
        ['7.2', 'As temperaturas e gases dentro do silo estão normais? (ideal < 95 °C e CO < 600 ppm)'],
        ['7.3', 'Sistema de inertização e fluidização estão normais?'],
        ['7.4', 'Há algum vazamento de carvão no descarregamento do silo?', { inv: true }],
        ['7.5', 'Há algum carvão acumulado sobre o silo? (risco de incêndio)', { inv: true }],
        ['7.6', 'O filtro de mangas 771-FL-002 opera normalmente?']
      ]},
      { t: '8 - Verificação dos silos de carvão britado 771-SL-001 e 771-SL-002', obs: true, itens: [
        ['8.1', 'Os silos de carvão britado estão cheios? (ideal 60 a 90%)'],
        ['8.2', 'As temperaturas dentro dos silos estão normais? (ideal < 80 °C)'],
        ['8.3', 'Chute de alimentação dos silos está limpo?'],
        ['8.4', 'Correia 771-TC-007 está em operação normal?'],
        ['8.5', 'Há algum rolete danificado na correia 771-TC-007?', { inv: true }],
        ['8.6', 'O batedor da correia está em funcionamento?'],
        ['8.7', 'O chute do retorno está desobstruído?'],
        ['8.8', 'O transportador 771-TA-001 opera normalmente?'],
        ['8.9', 'O transportador 771-TA-001 está com todas as portas de visita fechadas?']
      ]},
      { t: '9 - Verificação do filtro de mangas 771-FL-001', obs: true, itens: [
        ['9.1', 'O aquecedor de N2 771-AQ-006 do filtro opera normalmente?'],
        ['9.2', 'O sistema de batimento para limpeza das mangas está funcionando normalmente?'],
        ['9.3', 'Há algum vazamento de N2 ou carvão?', { inv: true }],
        ['9.4', 'Alguma solenoide do sistema de limpeza está travada aberta?', { inv: true }],
        ['9.5', 'A pressão do N2 de limpeza está OK? (6,5 kgf)'],
        ['9.6', 'Há alguma emissão visível pela chaminé?', { inv: true }],
        ['9.7', 'Roscas transportadoras e válvulas rotativas operam normalmente?'],
        ['9.8', 'A válvula manual de N2 está aberta na posição normal?'],
        ['9.9', 'O analisador de gases O2 e CO na saída do filtro opera normalmente?']
      ]}
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'partida',
    area: 'pulverizacao',
    nome: 'Partida da Pulverização de Carvão',
    arquivo: 'Partida_Pulverizacao',
    sigla: 'PAR',
    cor: '#1D4ED8',
    campos: ['data', 'turno', 'equipe'],
    assinatura: true,
    croquiRef: true,  // mostra o croqui de válvulas com as fotos de referência
    obsFinal: true,
    secoes: [
      { t: '1 - Estoque', itens: [['1.1', 'Estoque de Nitrogênio maior que 60.000 m³?']] },
      { t: '2 - Combate a incêndio', itens: [['2.1', 'Sistema de combate a incêndio em automático, realizado check com automação?']] },
      { t: '3 - Analisadores de gases', itens: [['3.1', 'Todos os analisadores de gases estão disponíveis sem falha?']] },
      { t: '4 - Portas de visita', itens: [['4.1', 'Realizada conferência de todas as portas de visita (filtro de mangas, GGQ, 771-TA-001, moinho e 771-VE-004)?']] },
      { t: '5 - Desbloqueio N2/GLP', itens: [['5.1', 'Realizado desbloqueio das linhas de N2/GLP, as válvulas de entrada e saída estão abertas?', { croqui: [2, 3] }]] },
      { t: '6 - Ajuste de pressão N2/GLP', itens: [
        ['6.1', 'Realizada abertura da válvula de N2 na entrada da planta com pressão de 7,5 bar?', { croqui: [3] }],
        ['6.2', 'Realizada abertura da válvula de GLP na entrada da planta com pressão de 1,1 bar?', { croqui: [2] }]
      ]},
      { t: '7 - Abertura de válvulas manuais', itens: [['7.1', 'Realizada conferência das aberturas: todas as válvulas manuais de N2 estão nas marcações corretas (FV-006/007/008/009/010/011)?', { croqui: [4, 5, 6, 7] }]] },
      { t: '8 - Níveis de silo', itens: [['8.1', 'Silos de carvão grosso se encontram acima de 50%?']] },
      { t: '9 - Ar de combustão da chama', itens: [['9.1', 'Ar radial e axial de combustão se encontram nas posições corretas (Radial 80% / Axial 90%)?', { croqui: [9] }]] },
      { t: '10 - Alimentação da T.A', itens: [['10.1', 'Foi realizada conferência da abertura das válvulas de saída de alimentação de carvão grosso (771-FV-001/002/003/004)?']] },
      { t: '11 - Posição dos dampers do GGQ', itens: [['11.1', 'Realizada conferência do posicionamento dos dampers do GGQ, estão com indicação correta conforme setpoint?']] },
      { t: '12 - Válvulas manuais dos filtros de mangas', itens: [['12.1', 'Foi realizada conferência em todas as válvulas manuais de batimento dos filtros de mangas?', { croqui: [8] }]] },
      { t: '13 - Moegas de transporte de carvão pulverizado', itens: [['13.1', 'Foi verificado se as chaves de nível das moegas de transporte estão limpas?']] },
      { t: '14 - Compressores e bombas de transporte de carvão', itens: [['14.1', 'As bombas e compressores foram testados e estão prontos para transporte de carvão?']] }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'partes',
    area: 'calcinacao',
    nome: 'Partes Atreladas ao Calcinador',
    arquivo: 'Partes_Atreladas_Calcinador',
    sigla: 'PAC',
    cor: '#C2410C',
    campos: ['tag', 'data', 'turno', 'equipe'],
    tags: ['411', '412'],
    assinatura: false,
    secoes: (function () {
      const TERMO = ['TERMOPARES', 'Verificar fixação dos termopares'];
      const ANILHAS = ['ANILHAS E CABOS DE AÇO', 'Inspecionar estado das anilhas (trincas, deformações, corrosão).\nVerificar tensão e fixação dos cabos de aço (folgas, desgaste, corrosão).\nConfirmar se os sistemas de trava estão funcionando corretamente.'];
      const PORTAS = ['PORTAS DE VISITA DOS DUTOS TERCIÁRIOS (08, 09, 10, 11 E 13)', 'Verificar vedação e fixação das portas (parafusos, dobradiças).\nConfirmar ausência de vazamentos.'];
      const CALHAS = ['CALHAS E ELETRODUTOS', 'Verificar fixação e alinhamento das calhas (parafusos, suportes).\nInspecionar estado dos eletrodutos (rachaduras, deformações, corrosão).'];
      const MIGRA = ['MIGRAÇÃO / ANÉIS DE RODAMENTO', 'Inspecionar estado dos blocos de retenção (patas de elefante) (trincas, deformações).\nInspecionar anéis de desgaste (trincas, deformações, alinhamento).\nInspecionar calços do anel de rodamento.'];
      const mk = (base, lista) => lista.map((x, i) => [base + '.' + (i + 1), x[0], { op: 'CNC', desc: x[1], obsItem: true }]);
      return [
        { t: '1 - Entre base 1 e base 2', itens: mk(1, [TERMO, ANILHAS, PORTAS, CALHAS, MIGRA]) },
        { t: '2 - Entre base 2 e base 3', itens: mk(2, [TERMO, ANILHAS, PORTAS, CALHAS, MIGRA]) },
        { t: '3 - Entre base 3 e base 4', itens: mk(3, [TERMO, CALHAS, MIGRA]) },
        { t: '4 - Entre base 4 e base 5', itens: mk(4, [TERMO, ANILHAS, CALHAS, MIGRA]) }
      ];
    })()
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'granulometria',
    area: 'granulometria',
    nome: 'Cálculo Granulometria – Minério e Carvão',
    arquivo: 'Granulometria',
    sigla: 'GRA',
    cor: '#0F766E',
    tipo: 'calculo',
    campos: ['material', 'data', 'turno', 'equipe'],
    materiais: ['Minério', 'Carvão'],
    assinatura: false
  }
];

/* Atalhos para formulários externos (aparecem como cartões na tela inicial, logo após os checklists).
   Precisam de internet para abrir. */
const LINKS = [
  {
    nome: 'Formulário Granulometria – Minério e Carvão',
    desc: 'Preenchimento da análise granulométrica no Microsoft Forms',
    url: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=JuF8kDJgY0KMSSZJHa1diDnbYPp7m6dBmuQku5NSDVRUOFcwTDY1RUJLUFFYNEVNMVBHVk1XQVhFQS4u',
    cor: '#0F766E',
    area: 'granulometria'
  }
];

/* Croqui de válvulas da Partida (fotos de REFERÊNCIA da planilha, para o operador consultar).
   As fotos ficam no arquivo croqui-fotos.js. */
const CROQUI = [
  { n: 1, t: 'Tanque de N2', d: 'Tanque de N2 da entrada da planta', fotos: [] },
  { n: 2, t: 'Cavalete de entrada GLP', d: 'Posição de válvula aberta, pressão 1,1 bar', fotos: ['foto04.jpg'] },
  { n: 3, t: 'Cavalete de entrada de N2 na planta', d: 'Válvula de N2 de entrada da planta, posição aberta, pressão 7,4 bar', fotos: ['foto09.jpg', 'foto05.jpg'] },
  { n: 4, t: 'Moinho', d: 'Válvulas de N2 de inertização do moinho na posição correta para partida', fotos: ['foto06.jpg', 'foto07.jpg'] },
  { n: 5, t: 'GGQ / 771-VE-004', d: 'Válvulas de N2 de inertização do GGQ na posição correta para partida', fotos: ['foto08.jpg', 'foto10.jpg', 'foto12.jpg'] },
  { n: 6, t: 'Silos', d: 'Válvula de N2 de inertização dos silos na posição correta para partida (FV-002)', fotos: ['foto11.jpg'] },
  { n: 7, t: 'Inertização dos filtros de mangas', d: 'Válvulas de N2 de inertização dos filtros de mangas na posição correta para partida', fotos: ['foto14.jpg', 'foto13.jpg', 'foto15.jpg'] },
  { n: 8, t: 'Válvulas manuais do filtro de mangas', d: 'Válvulas de N2 responsáveis pelo batimento dos filtros de mangas na posição correta para partida', fotos: ['foto16.jpg', 'foto17.jpg', 'foto18.jpg', 'foto19.jpg'] },
  { n: 9, t: 'Válvulas de combustão da chama', d: 'Posição das válvulas de combustão da chama (Radial 80% / Axial 90%)', fotos: ['foto20.jpg', 'foto21.jpg'] }
];
