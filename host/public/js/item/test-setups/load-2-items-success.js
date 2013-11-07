

angular.module('smfCqrs')
    .run(function (smfCqrsMockConfig) {

    console.info("setup load-2-items-success mock: " + smfCqrsMockConfig);

    smfCqrsMockConfig.whenLoadItems(
        null,
        [
            new item_model.Item("77e7c7df-c9d8-43d9-8ef4-39abad1ea560", "Item 1"),
            new item_model.Item("afa95629-9e09-4bac-a0d5-299e27488d14", "Item 2")
        ]);
})
