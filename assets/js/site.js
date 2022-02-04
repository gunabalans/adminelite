function toggleSubMenu() {
    var collapseElementList = [].slice.call(document.querySelectorAll('.collapse.show'))
    //console.log(collapseElementList)
    collapseElementList.map(function (collapseEl) {
      new bootstrap.Collapse(collapseEl, { hide: true });
    })
  }


