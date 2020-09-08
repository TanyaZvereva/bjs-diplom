const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) location.reload();
    });
};
ApiConnector.current(response => {
    if (response.success) ProfileWidget.showProfile(response.data);
});
const ratesBoard = new RatesBoard();

function updateTable() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};
updateTable()
setTimeout(() => {
    updateTable
}, 60000);
const favoritesWidget = new FavoritesWidget();
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            favoritesWidget.setMessage(false, "Успешно!")
        } else {
            console.log(response)
            favoritesWidget.setMessage(true, response.data)
        };
    });
};
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            favoritesWidget.setMessage(false, "Успешно!")
        } else {
            console.log(response)
            favoritesWidget.setMessage(true, response.data)
        };
    });
};
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            favoritesWidget.setMessage(false, "Успешно!")
        } else {
            console.log(response)
            favoritesWidget.setMessage(true, response.data)
        };
    });
};
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, "Успешно!");
        } else {
            favoritesWidget.setMessage(true, "Ошибка!")
        };
    });
};
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, "Успешно!");
        } else {
            favoritesWidget.setMessage(true, "Ошибка!")
        };
    });
};