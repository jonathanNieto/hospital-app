$(document).ready(function () {
    // Basic
    $('.dropify').dropify({
      messages: {
        'default': 'Arrastre y suelte aquí una imagen o haga click para seleccionar una',
        'replace': 'Arrastre y suelte aquí una imagen o haga click para reemplazar',
        'remove': 'Eliminar',
        'error': 'Ooops, ha ocurrido un error.'
      }
    });

    // Used events
    var drEvent = $('#input-file-events').dropify();

    drEvent.on('dropify.beforeClear', function (event, element) {
      return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
    });

    drEvent.on('dropify.afterClear', function (event, element) {
      alert('File deleted');
    });

    drEvent.on('dropify.errors', function (event, element) {
      console.log('Has Errors');
    });

    var drDestroy = $('#input-file-to-destroy').dropify();
    drDestroy = drDestroy.data('dropify')
    $('#toggleDropify').on('click', function (e) {
      e.preventDefault();
      if (drDestroy.isDropified()) {
        drDestroy.destroy();
      } else {
        drDestroy.init();
      }
    })

    /* clear */
    $(".dropify-clear").trigger("click"); 

  });