
  function PlanListCtrl($scope, $http) {
  $scope.plans = [];
  
  $scope.addPlan = function (isp,name,downloadSpeed,uploadSpeed,bandwithLimit,price,link) {
	  $scope.plans.push(
	  	{"isp":isp,
	  	"name":name,
	  	"down_speed":downloadSpeed,
	  	"up_speed":uploadSpeed,
	  	"limit":bandwithLimit,
	  	"price":price,
	  	"i_price":1/price, //Hack needed for multi-column sort
	  	"link":link,
	  	"icon":"images/"+isp.toLowerCase().replace("\u00E9","e")+"_favicon.png"});
  }
  
  //
  $http.get('data/all_plans.json').success(function(data) {
	  for (var i = 0; i < data.length; i++) {
		  item = data[i];
		  //console.info(item);
		  $scope.addPlan(item[0],item[1],item[2],item[3],item[4],item[5],item[6]);
	  }
    
  });
 
  
  
  $scope.predicate = ["i_price",'down_speed','limit'];
  
  $scope.default_max_fee = 200;
  
  $scope.criteriaMatch = function( criteria ) {
  return function( item ) {
	  
	 
    return (
    	item.down_speed >= document.criteria.min_down_speed.value 
    	&& (item.limit >= document.criteria.min_download_limit.value || item.limit === null)
    	&& (item.price <= document.criteria.montly_fee.value || document.criteria.montly_fee.value == '')
    	);
  };
};
}