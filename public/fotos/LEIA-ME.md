# Onde colocar as fotos

Três raízes, e a escolha entre elas **não é organizacional: é dado**. Um teste
confere que a pasta bate com o que o projeto declara em `unidades`.

```
public/fotos/
  sjc/        projetos que aparecem SÓ em dalmobilesjc.com.br
  caragua/    projetos que aparecem SÓ em dalmobilecaraguatatuba.com.br
  comum/      projetos que aparecem NOS DOIS sites
```

**Por que existe a `comum/`.** Um projeto pode ser marcado
`unidades: [sjc, caragua]`. Sem esta terceira pasta, a mesma foto teria duas
cópias — o dobro de arquivo, e duas versões que um dia divergem sem ninguém
perceber. A `comum/` existe para isso, e o teste recusa uma foto em `sjc/`
num projeto que também aparece em Caraguá.

Dentro de cada raiz, **uma pasta por ambiente**:

```
public/fotos/sjc/cozinha-compacta/
public/fotos/sjc/closet/
...
```

## Como nomear o arquivo

Como a pasta é do ambiente, **o nome do arquivo diz de que projeto é**:

```
public/fotos/sjc/cozinha-compacta/rizzuti-dr-marcos-01.webp
                                  └── slug do projeto ──┘ └┘ ordem
```

## O tamanho

Mande o arquivo **grande**, na melhor qualidade que tiver — pelo menos 1920px
de largura. **Não reduza nada à mão.** O build gera sozinho as versões de 440,
880, 1240 e 1920px e serve a certa para cada tela. Reduzir antes só faz o site
ficar borrado no desktop.

## Os oito ambientes

Vêm dos catálogos, e estão na seção 3.3 do `docs/direcao-site.md`:

cozinha compacta · closet · lavanderia · casa integrada · home office ·
sala de estar · cozinha gourmet · banheiro

O conjunto de Caraguá ainda depende da curadoria do acervo do litoral — as
pastas estão criadas, mas quais entram no site é decisão em aberto.

A lista que vale é `lib/ambientes.ts`. Ambiente fora dela quebra o build, de
propósito: em trinta projetos, "Cozinha", "cozinha" e "Cozinha compacta"
viram três filtros diferentes para a mesma coisa.

Ver `docs/adicionar-projeto.md` para o passo a passo completo.
