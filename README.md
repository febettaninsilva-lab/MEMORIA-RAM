# MEMORIA-RAM
Esta demonstração simula como uma célula de memória DRAM (RAM Dinâmica) funciona internamente no nível de hardware. Cada bit de memória em um pente de RAM real é composto por um micro-capacitor, que armazena carga elétrica, e um transistor, que funciona como a chave de acesso.
1. Bit 1 (Carregado): quando o capacitor está com a carga elétrica alta, acima da linha pontilhada amarela de 20%, o sistema lê a presença de tensão elétrica como o valor lógico 1.

2. Bit 0 (Descarregado): quando a carga cai abaixo do limiar 20%, a tensão elétrica fica muito fraca para ser reconhecida. O sistema passa a interpretar aquele endereço como 0.

3. A Volatilidade e o Vazamento: na prática, os capacitores da memória RAM são microscópicos e vazam carga elétrica naturalmente a todo momento. É por isso que a memória RAM é chamada de volátil, se a energia for cortada ou se a carga vazar por completo, as informações armazenadas desaparecem.

4. Como os capacitores vazam o tempo todo, o controlador de memória do computador precisa ler e recarregar bilhões de células várias vezes por segundo, milhares de vezes a cada segundo numa RAM real. A função Refresh Global simula esse processo, ela verifica se o bit ainda está acima do limite de leitura 20% e injeta energia novamente até atingir 100%. Se não for acionado o Refresh a tempo, a carga cruza a linha de limite e a informação se perde, o bit vira 0 permanentemente.
