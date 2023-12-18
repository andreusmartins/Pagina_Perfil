$(document).ready(function(){  
    $("#Hbio").on("click", function(){
        $("#desc").animate({
            height: 'toggle'  
        });
    });
    
  });


$(document).ready(function(){
    $(".modal-trigger").click(function(){
        // Obtém o alvo do modal a partir do atributo data-modal-target
        var modalTarget = $(this).data("modal-target");
        
        // Exibe o modal
        $(modalTarget).show();
        
        // Adiciona uma classe ao body para esconder a barra de rolagem
        $("body").addClass("modal-open");
    });

    $(".modal-close").click(function(){
        // Fecha o modal
        $(this).closest(".modal").hide();

        // Remove a classe do body para mostrar a barra de rolagem
        $("body").removeClass("modal-open");
    });
});

