module.exports = {
    trimChar: (string, charToRemove) => {
        while (string.charAt(0) == charToRemove) {
            string = string.substring(1);
        }

        while (string.charAt(string.length - 1) == charToRemove) {
            string = string.substring(0, string.length - 1);
        }

        return string;
    },
    formatarDatas: (divida) => {
        return divida.data != null ? ((divida.data.getFullYear()) + "-" +
            ((divida.data.getMonth() + 1) < 10 ? "0" + (divida.data.getMonth() + 1) :
                (divida.data.getMonth() + 1)) + "-" + ((divida.data.getDate() + 1) < 10 ?
                "0" + (divida.data.getDate() + 1) : (divida.data.getDate() + 1))) : null;
    },
}