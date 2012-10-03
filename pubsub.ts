module PubSub { 
    interface ISubscription {
        (...args: any[]): void;
    }

    interface IDictionary {
        [name: string] : ISubscription[];
    }       

    var registry : IDictionary = {
    }

    export var Pub = function(name: string, ...args: any[]) {
        if (!registry[name]) return;
            registry[name].forEach(x => {
                x.apply(null, args);
            });
    }

    export var Sub = function(name: string, fn: ISubscription) {
        if (!registry[name]){                   
            registry[name] = [fn];
        } else {
            registry[name].push(fn);
        }
    }
}

PubSub.Sub('foo', function (...args: any[]) {
    var body = document.body;
    args.forEach(x => {
        var el = document.createElement('p');
        el.innerHTML = x;
        body.appendChild(el);
    });
});

var foo = function () {
    PubSub.Pub('foo', 'a', 'b');

    setTimeout(foo, 5000);
};

setTimeout(foo, 1000);