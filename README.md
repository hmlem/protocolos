# HMLEM Protocolos

Uma aplicação WEB de uma página com arquivamente progressivo de dados (WEB Progressive App) para buscar protocolos, relacionados à Saúde em Água Fria/BA , principalmente ao Hospital.

# Funcionamento e Funcionalidades do MVP

A aplicação contem uma página de busca e uma página de navegação, para visualizar todo o link é necessário que seja referenciado para o FIGMA, enquanto o modo de visualização sequencial já devem funcionar no MVP

# Roadmap

Criação automatizada de visualização de protocolos, autogerados por meio de arquivos `yml`. Para isso a ideia é, depois de muitos estudos e dificuldades, treinar uma I.A. para organizar as caixas de forma a respeitar as regras abaixo:
1. Cada caixa deve ter um tamanho interessante que comporte o conteúdo Markdown dentro ou siga a referência de largura indicado no `yml`
2. Cada caixa deve ficar o mais próximo possível de sua antecessora
3. Cada conexão deve sair de um dos 4 pontos cardeais das caixas
4. As conexões não devem ter cruzamentos entre si
5. Todo o conjunto deve ter a mínima largura possível, facilitando a visualização/leitura do conjunto