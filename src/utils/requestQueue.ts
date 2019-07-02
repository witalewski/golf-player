const INTERVAL = 200;

const queue: {
  func: Function;
  args: any[];
}[] = [];

const nextRequest = () => {
  if (queue.length) {
    const { func, args } = queue.shift();
    func.apply(this, args);
  }
};

setInterval(nextRequest, INTERVAL);

export const addToQueue = (func: Function, ...args: any[]): void => {
  queue.push({
    func,
    args
  });
};
