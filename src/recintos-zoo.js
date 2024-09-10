class RecintosZoo {
    constructor(){
        this.animais = {
            LEAO:{tamanho:3, biomas:['savana'], carnivoro: true},
            LEOPARDO:{tamanho:2, biomas:['savana'], carnivoro: true},
            CROCODILO:{tamanho:3, biomas:['rio'], carnivoro: true},
            MACACO:{tamanho:1, biomas:['savana','floresta'], carnivoro: false},
            GAZELA:{tamanho:2, biomas:['savana'], carnivoro: false},
            HIPOPOTAMO:{tamanho:4, biomas:['savana','rio'], carnivoro: false},

        };

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },




        ];
    }

    analisaRecintos(animal, quantidade) {
        if(!this.animais[animal]){
            return{erro: 'animal invalido'};
        }
        if (isNaN(quantidade)||quantidade <= 0){
            return {erro: 'quantidade inválida'}; }


            const { tamanho, biomas, carnivoro } = this.animais[animal];
            let recintosViaveis = [];

            for(const recinto of this.recintos){

                if(!biomas.includes(recinto.bioma)&& !(animal==='HIPOPOTAMO' && recinto.bioma === 'savana e rio')){
                    continue;
                }

                let espacoLivre = recinto.tamanhoTotal;
                let ocupacao = 0;
                let existeOutraEspecie = false;
                let convivendoComCarnivoro = false;

                for (const existente of recinto.animais){
                    const especieExistente = this.animais[existente.especie];
                    ocupacao += existente.quantidade * especieExistente.tamanho;

                    if (especieExistente.carnivoro) convivendoComCarnivoro = true;
                    if (existente.especie !== animal) existeOutraEspecie = true;

                }
                ocupacao += quantidade * tamanho;
                if (existeOutraEspecie) ocupacao += 1;
          
                espacoLivre -= ocupacao;

                if (carnivoro && existeOutraEspecie) continue;
                if (convivendoComCarnivoro && !carnivoro) continue;
                if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && existeOutraEspecie)continue;


                if (espacoLivre >= 0){
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
                }

            }
            if (recintosViaveis.length === 0) {
                return { erro: 'Não há recinto viável' };
              }
          
              return { recintosViaveis };
            }
          }
          
          
          export { RecintosZoo as RecintosZoo };
    
