class PromiseQueue {
  queue: (() => Promise<void>)[] = [];
  isProcessing = false;

  add(promiseFn: () => Promise<void>): Promise<unknown> {
    const wrappedPromiseFn = async () => {
      try {
        await promiseFn();
      } catch (error) {
        console.error(error);
      }

      if (this.queue.length > 0) {
        const nextPromise = this.queue.shift();
        if (nextPromise) nextPromise();
      } else {
        this.isProcessing = false;
      }
    };

    if (this.isProcessing) {
      return new Promise((resolve, reject) => {
        this.queue.push(() => wrappedPromiseFn().then(resolve).catch(reject));
      });
    } else {
      this.isProcessing = true;
      return wrappedPromiseFn();
    }
  }
}

export default PromiseQueue;
