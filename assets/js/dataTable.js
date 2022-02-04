/**
 * add id to table : replace 
 * > "#my_table_id", line with the id 
 * 
 * add class s to tr
 * 
 * add paging container where u want
 * <nav id="pagination"></nav>
 */
const data_table = {
    tableid: "#my_table_id",
    ft: function(t, j) {

        var trs = document.querySelectorAll(this.tableid + " tr.s");
        var totalRow = trs.length;
        var filter = t.value.toUpperCase();

        //set starting point
        for (i = 0; i < totalRow; i++) {
            var td = trs[i].getElementsByTagName("td")[j];
            if (td) {
                var txtValue = td.textContent || td.innerText;

                trs[i].removeAttribute('class');
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    trs[i].style.display = "";
                    trs[i].setAttribute('class', 's');
                } else {
                    trs[i].style.display = "none";
                }
            }
        }
        //call paging after filter
        this.paging();
    },
    ftreset: function() {
        var trs = document.querySelectorAll(this.tableid + " tbody tr");
        var totalRow = trs.length;
        //set starting point
        for (i = 0; i < totalRow; i++) {
            trs[i].removeAttribute('class');
            trs[i].setAttribute('class', 's');
        }

        //column search clear
        var cols = document.querySelectorAll("input.colsearch");
        for (i = 0; i < cols.length; i++) {
            cols[i].value = '';
        }
        //call paging after filter
        this.paging();
    },
    filterTable: function(page, pagesize, event = null) {

        var trs = document.querySelectorAll(this.tableid + " tr.s")
        var totalRow = trs.length;

        //set starting point
        var min = page;


        if (page >= totalRow) {
            min = totalRow;
        }

        var max = min + pagesize;
        if (max > totalRow) {
            max = totalRow;
        }

        for (i = 0; i < totalRow; i++) {
            if (i < min) {
                trs[i].style.display = "none";
            } else if (i >= max) {
                trs[i].style.display = "none";
            } else {
                trs[i].style.display = "";
            }
        }

        trs = null; //remove trs
        if (event != null) {
            var pr = event.target.parentElement;
            for (const li of pr.parentElement.querySelectorAll("li.active")) {
                li.classList.remove("active");
            }
            pr.classList.add("active");
            pr = null;
        }

    },
    paging: function() {
        var pagesize = document.getElementById('pagesize').value;

        if (isNaN(pagesize)) {
            pagesize = 0;
        }

        pagesize = parseInt(pagesize);

        var trs = document.querySelectorAll(this.tableid + " tr.s");
        var totalRow = trs.length; //remove header count

        var listView = document.createElement('ul');
        listView.setAttribute("class", "pagination");

        var j = 1;
        for (var i = 0; i < totalRow;) {
            var listViewItem = document.createElement('li');
            listViewItem.setAttribute("class", "page-item");
            var button = document.createElement('a');
            button.setAttribute("class", "page-link");
            button.setAttribute("id", i);


            button.setAttribute("onclick", "data_table.filterTable(" + i + "," + pagesize + ",event)");
            button.innerHTML = j;

            listViewItem.appendChild(button);
            listView.appendChild(listViewItem);
            i = i + pagesize;
            j++;
        }

        var pagination = document.getElementById("pagination");
        pagination.innerHTML = ''; //clear prev list view
        pagination.appendChild(listView);
        listView = null; // just dereferencing ul element
        //filter initially
        this.filterTable(0, pagesize)
    }
};