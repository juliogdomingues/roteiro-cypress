describe("TODOMvc App", () => {
  it("Verifica se app está abrindo", () => {
    cy.visit("");
  });

  it("Insere uma tarefa", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("TP2 de Engenharia de Software{enter}");

    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de Engenharia de Software");
  });

  it("Insere e deleta uma tarefa", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]").type("TP2 de Engenharia de Software{enter}");

    cy.get("[data-cy=todos-list]").children().should("have.length", 1);

    cy.get("[data-cy=todos-list] > li [data-cy=remove-todo-btn]")
      .invoke("show")
      .click();

    cy.get("[data-cy=todos-list]").children().should("have.length", 0);
  });

  it("Filtra tarefas completas e ativas", () => {
    cy.visit("");

    cy.get("[data-cy=todo-input]")
      .type("TP2 de ES{enter}")
      .type("Prova de ES{enter}");

    cy.get("[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]")
      .first()
      .click();

    cy.get("[data-cy=filter-active-link").click();
    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "Prova de ES");

    cy.get("[data-cy=filter-completed-link").click();
    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "TP2 de ES");

    cy.get("[data-cy=filter-all-link").click();
    cy.get("[data-cy=todos-list]").children().should("have.length", 2);
  });

  it("Edita uma tarefa existente", () => {
    cy.visit("");

    // Adicionar uma tarefa
    cy.get("[data-cy=todo-input]").type("Tarefa original{enter}");

    cy.get("[data-cy=todos-list] > li").first().dblclick(); // Ativar modo de edição

    cy.get("[data-cy=todos-list] > li .edit")
      .clear()
      .type("Tarefa editada{enter}"); // Editar tarefa

    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "Tarefa editada");
  });

  it("Cancela a edição de uma tarefa e verifica se o texto original é mantido", () => {
    cy.visit("");

    // Adicionar uma tarefa
    cy.get("[data-cy=todo-input]").type("Tarefa original{enter}");

    // Ativar modo de edição
    cy.get("[data-cy=todos-list] > li").first().dblclick();

    // Editar a tarefa e cancelar (pressionando ESC)
    cy.get("[data-cy=todos-list] > li .edit")
      .clear()
      .type("Tarefa editada")
      .type("{esc}"); // Cancela edição

    // Verificar se o texto original foi mantido
    cy.get("[data-cy=todos-list]")
      .children()
      .first()
      .should("have.text", "Tarefa original");
  });

  it("Limpa tarefas completas", () => {
    cy.visit("");

    // Adicionar tarefas
    cy.get("[data-cy=todo-input]")
      .type("Tarefa 1{enter}")
      .type("Tarefa 2{enter}");

    // Marcar a primeira como completa
    cy.get("[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]")
      .first()
      .click();

    // Limpar tarefas completas
    cy.get(".clear-completed").click();

    // Verificar que apenas tarefas incompletas permanecem
    cy.get("[data-cy=todos-list]")
      .children()
      .should("have.length", 1)
      .first()
      .should("have.text", "Tarefa 2");
  });
});
