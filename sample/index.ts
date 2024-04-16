import { createModuleInspector } from "../src/createModuleInspector";

// A module represents a collection of functionalities
const inspector = createModuleInspector("MY_MODULE");

function myFunction () {
    // Each module can have multiple methods, and you can create `processes` to differentiate executions
    const logger = inspector.method("myFunction").process();

    // You can log different types of events
    logger.log({ type: "start" });

    try { 
        // Do something
        logger.log({ type: "success" });
    } catch (exc) {
        // You can also append data to the logs
        logger.log({ type: "error", data: { message: exc.message }});
    }
}