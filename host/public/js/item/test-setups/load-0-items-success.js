

angular.module('smfCqrs')
    .run(function (smfCqrsMockConfig) {

        console.info("setup load-0-items-success mock: " + smfCqrsMockConfig);

        smfCqrsMockConfig.whenLoadItems(
            null,
            []);
    })
