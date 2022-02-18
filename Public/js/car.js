//var app = angular.module("app", [])
var app = angular.module('app', ['ui.grid', 'ui.grid.pagination', 'ui.grid.selection']);

//myApp.controller("myCntrl", ['$scope', '$http', 'i18nService', 
//initCntrl]);

app.controller("MainController", ['$scope', function($scope) {
	
	$scope.limit = 25;
	$scope.column = 'id';
	$scope.reverseSort = false;
	$scope.sortClass = "text-primary";
	
	$scope.sortColumn = function(column) {
		$scope.reverseSort = ($scope.column == column) ? !$scope.reverseSort : false;
		$scope.column = column;
	};
	
	$scope.properties = [{
		"id": 1,
		"name": "Howard Oliver",
		"type": "Chengguan",
		"bed": 9,
		"bath": 5,
		"sleeps": 3,
		"status": "Inactive"
	}, {
		"id": 98,
		"name": "Billy Bradley",
		"type": "Mohammedia",
		"bed": 2,
		"bath": 5,
		"sleeps": 2,
		"status": "Active"
	}, {
		"id": 99,
		"name": "Ralph Parker",
		"type": "Szeged",
		"bed": 5,
		"bath": 4,
		"sleeps": 5,
		"status": "Inactive"
	}, {
		"id": 100,
		"name": "Judy Morgan",
		"type": "Slyudyanka",
		"bed": 2,
		"bath": 2,
		"sleeps": 6,
		"status": "Active"
	}];	
}]);


//app.controller("MainController", ['$scope', function($scope) {
app.controller("MoveCtrl", ['$scope', function($scope) {
	 $scope.moveItem = function(items, from, to) {

        console.log('Move items: ' + items + ' From: ' + from + ' To: ' + to);
        //Here from is returned as blank and to as undefined

        items.forEach(function(item) {
          var idx = from.indexOf(item);
          if (idx != -1) {
              from.splice(idx, 1);
              to.push(item);      
          }
        });
    };
    $scope.moveAll = function(from, to) {

        console.log('Move all  From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined

        angular.forEach(from, function(item) {
            to.push(item);
        });
        from.length = 0;
    };                

    $scope.selectedclients = [];                                

    $scope.availableclients = [
      {
        id: 1, 
        name: 'foo'
      }, 
      {
        id: 2, 
        name: 'bar'
      },
      {
        id: 3,
        name: 'baz'
      }
    ];
	
	}]);
app.controller("MainCtrl", ['$scope', '$timeout', function($scope , $timeout) {
    var vm = this;
    vm.gridOptions = {
      enableRowSelection: false,
      enableSelectAll: false,
      showGridFooter:true,
      data: [{productName: "Moroni", unitPrice: 50},
             {productName: "Tiancum", unitPrice: 43},
             {productName: "Jacob", unitPrice: 27},
             {productName: "Nephi", unitPrice: 29},
             {productName: "Enos", unitPrice: 34}]
    };
    vm.gridOptions.columnDefs = [
        { name: 'productName' },
        { name: 'unitPrice' }
    ];
    vm.gridOptions.multiSelect = false;
    vm.getSelectedRows = function () {
        vm.mySelectedRows = vm.gridApi.selection.getSelectedRows();
    }
    vm.getProductList = function() {
      vm.gridOptions.data = vm.resultSimulatedData;
      vm.mySelectedRows = vm.gridApi.selection.getSelectedRows(); //<--Property undefined error here
      if (vm.mySelectedRows[0]) {
        alert('Selected Row: ' + vm.mySelectedRows[0].productName + ', ' + vm.mySelectedRows[0].unitPrice + '.');
      } else {
        alert('Select a row first');
      }
      $timeout(function() {
          if (vm.gridApi.selection.selectedRow) {
              vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
          }
      });
    };
    vm.gridOptions.onRegisterApi = function(gridApi) {
      vm.gridApi = gridApi;
    };
    vm.resultSimulatedData = [{productName: "Moroni1", unitPrice: 50},
                               {productName: "Tiancum1", unitPrice: 43},
                               {productName: "Jacob1", unitPrice: 27},
                               {productName: "Nephi1", unitPrice: 29},
                               {productName: "Enos1", unitPrice: 34}];
    return vm;
  }]);

$(document).ready(function() {
    //Helper function to keep table row from collapsing when being sorted
	var fixHelperModified = function(e, tr) {
		var $originals = tr.children();
		var $helper = tr.clone();
		$helper.children().each(function(index)
		{
		  $(this).width($originals.eq(index).width())
		});
		return $helper;
	};

	//Make diagnosis table sortable
	$("#diagnosis_list tbody").sortable({
    	helper: fixHelperModified,
		stop: function(event,ui) {renumber_table('#diagnosis_list')}
	}).disableSelection();


	//Delete button in table rows
	// $('table').on('click','.btn-delete',function() {
	// 	tableID = '#' + $(this).closest('table').attr('id');
	// 	r = confirm('Delete this item?');
	// 	if(r) {
	// 		$(this).closest('tr').remove();
	// 		renumber_table(tableID);
	// 		}
	// });

});

//Renumber table rows
function renumber_table(tableID) {
	$(tableID + " tr").each(function() {
		count = $(this).parent().children().index($(this)) + 1;
		$(this).find('.priority').html(count);
	});
}


// $(function(){
//     $('.table').on('click', 'tr', function(e){
//             var $tr = $(this);
//             var $table = $tr.closest('.table');
//             var our_index = $($tr,$table).index();
//             if (e.shiftKey) {
//                 var last_index = $table.data('last-index');
//                 if (last_index) {
//                     if (last_index < our_index) {
//                         while(last_index < our_index) {
//                             $('tbody tr:eq('+(++last_index)+')', $table).click();
//                         }   
//                         $('tbody tr:eq('+(last_index)+')', $table).click();
//                     } else {  
//                         while(last_index > our_index) {
//                             $('tbody tr:eq('+(--last_index)+')', $table).click();
//                         }
//                         $('tbody tr:eq('+(last_index)+')', $table).click();
//                     } 
//                 }
//                 $table.data('last-index',our_index);
//             } else {
//                 $table.data('last-index',our_index);
//             }
            
//             if ($tr.hasClass('success')) {
//                 $tr.removeClass('success');
//             } else {
//                 $tr.addClass('success');
//             }
//     });
// });



//  $(".selectCheck").click(function() {
//  if($(this).prop("checked") == true){
// 	$("#clonedData").append($(this).parent().parent().clone());
//   $("#clonedData").find(".removeIt").remove();
//  }else{
//  	 var rowCheck = $(this).parent().parent().clone();
//    rowCheck.children(".removeIt").remove();
//    $('#clonedData tr').each(function(){
//      if(rowCheck.html()==$(this).html()){
//      	$(this).remove();
//      } 
//    });
//  }
// });
  
$("#appendToTable").click(function() {
	$("#printTable").append($("#clonedData").children().clone());
  $("#clonedData").html('');
});

// Code goes here
var workdata = {};
workdata.items = [{
  'ITEMNO': '10',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '20',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '30',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '40',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '50',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '60',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '70',
  'SERIALN_REQ': 'X',
}, {
  'ITEMNO': '80',
  'SERIALN_REQ': 'X',
}];

//myApp.controller("myCntrl", ['$scope', '$http', 'i18nService', 
//initCntrl]);

//app.controller("MainController", ['$scope', function($scope) {

