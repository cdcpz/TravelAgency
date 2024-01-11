interface IDbPersist<T> {
    save: (key: string, param: T) => void
    get: (key: string) => T | undefined
    remove: (key: string) => void
}

class SessionPersist<T> implements IDbPersist<T> {
    save = (key: string, param: T) => {
        if(!param || !key) return
        var json = sessionStorage.getItem(key)
        if(json) this.remove(key)
        sessionStorage.setItem(key, JSON.stringify(param))
    }
    get = (key: string) => {
        if(!key) return
        var json = sessionStorage.getItem(key)
        if(!json) return
        return JSON.parse(json) as T
    }
    remove = (key: string) => {
        if(!key) return
        sessionStorage.removeItem(key)
    }    
}

class LocalPersist<T> implements IDbPersist<T> {
    save = (key: string, param: T) => {
        if(!param || !key) return
        var json = localStorage.getItem(key)
        if(json) this.remove(key)
        localStorage.setItem(key, JSON.stringify(param))
    }
    get = (key: string) => {
        if(!key) return
        var json = localStorage.getItem(key)
        if(!json) return
        return JSON.parse(json) as T
    }
    remove = (key: string) => {
        if(!key) return
        localStorage.removeItem(key)
    }    
}

export function SessionDbPersist<T>() {
    return new SessionPersist<T>()
}

export function LocalDbPersist<T>() {
    return new LocalPersist<T>()
}