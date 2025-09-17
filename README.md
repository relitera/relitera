# relitera

- Página inicial
xxxxxx

- Quem somos
xxxxx

- Loja
xxxxx

- Minha conta
xxxxx

- Plataforma


Uma plataforma de cursos online que desenvolvi para facilitar o aprendizado. O foco é na experiência do usuário e na simplicidade de uso.

## Linguagens Usadas

- HTML5
- CSS3 
- JavaScript vanilla
- Font Awesome para os ícones

## Como funciona

A plataforma tem uma interface escura e moderna, com cards de cursos que você pode navegar horizontalmente. Tem sistema de busca, popups para detalhes dos cursos e é totalmente responsiva.

### Principais funcionalidades

- Menu mobile com sidebar
- Sistema de abas (Conteúdos, Trilhas, Sobre)
- Cards de cursos interativos
- Busca em tempo real
- Popup com detalhes dos cursos
- Notificações
- Design responsivo

## Como rodar

1. Baixa os arquivos
2. Abre o `index.html` no navegador
3. Pronto!

## Estrutura dos arquivos

```
Plataforma/
├── index.html    # Página principal
├── styles.css    # Estilos
├── script.js     # JavaScript
└── README.md     # Este arquivo
```

## Personalização

### Mudar cores

No `styles.css`, você pode alterar as variáveis de cor:

```css
body {
    background-color: #1a1a1a;  /* Fundo principal */
    color: #ffffff;             /* Texto */
}
```

### Adicionar cursos

No `script.js`, adiciona no objeto `courses`:

```javascript
const courses = {
    'novo-curso': {
        title: 'Nome do Curso',
        description: 'Descrição',
        progress: 0,
        totalLessons: 20,
        completedLessons: 0
    }
};
```

## Responsividade

Funciona bem em:
- Desktop
- Tablet  
- Mobile

Usamos media queries para ajustar o layout em telas menores.

## Próximos passos

Algumas ideias para melhorar:

- Sistema de login
- Player de vídeo
- Salvar progresso no localStorage
- Chat
- Certificados
- Modo offline

## Bugs conhecidos

- As imagens dos cursos são placeholders
- Algumas animações podem ser um pouco lentas em dispositivos antigos
- O popup não fecha com ESC em alguns casos

## Contribuições

Se quiser contribuir, fique à vontade! Pode:
- Reportar bugs
- Sugerir melhorias
- Fazer pull requests

## Contato

andre.w.l.o@puccampinas.edu.br

---

Desenvolvido com foco na simplicidade e usabilidade.
