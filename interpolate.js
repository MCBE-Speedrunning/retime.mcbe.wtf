const regex = /\${[^{]+}/g;

export default function interpolate(template, variables, fallback) {
    return template.replace(regex, (match) => {
        const path = match.slice(2, -1).trim();
        return getObjPath(path, variables);
    });
}

//get the specified property or nested property of an object
function getObjPath(path, obj) {
    return path.split('.').reduce((res, key) => res[key], obj);
}