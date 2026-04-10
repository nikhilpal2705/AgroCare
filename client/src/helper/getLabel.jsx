const convertLabel = (key) => {
    // Replace underscores (_) with spaces
    let spacedStr = key.replace(/_/g, ' ');

    // Convert camelCase to title case
    return spacedStr.replace(
        /[A-Z]/g,
        function (txt) {
            return ' ' + txt.toLowerCase();
        }
    ).trim().replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const getLabel = () => {
    const translate = (value) => convertLabel(value);
    return translate;
};

export default getLabel;
