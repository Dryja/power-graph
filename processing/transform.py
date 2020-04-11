import sqlite3

import pandas as pd
import numpy as np

store = pd.HDFStore("./task_data.hdf5")

tables = {"nodes": None, "gens": None, "branches": None}

for key in tables.keys():
    arr = getattr(store.get_node(f"/results/hour_1"), key).read()
    hours = np.ones((arr.shape[0], 1))
    tables[key] = np.hstack((arr, hours))
for hour in range(2, 25):
    for key in tables.keys():
        arr = getattr(store.get_node(f"/results/hour_{hour}"), key).read()
        hours = np.ones((arr.shape[0], 1)) * hour
        arr = np.hstack((arr, hours))
        tables[key] = np.concatenate((tables[key], arr), axis=0)


nodes_df = pd.DataFrame(
    tables["nodes"], columns=["node_id", "node_type", "demand", "hour"]
)
gens_df = pd.DataFrame(
    tables["gens"], columns=["node_id", "generation", "cost", "hour"]
)
branches_df = pd.DataFrame(
    tables["branches"], columns=["node_from", "node_to", "flow", "hour"]
)


nodes_df = pd.merge(nodes_df, gens_df, on=["node_id", "hour"], how="left")
nodes_df = nodes_df.astype({"node_id": "int32", "node_type": "int32", "hour": "int32"})
nodes_df.set_index(["node_id", "hour"], inplace=True)


branches_df = branches_df.astype(
    {"node_from": "int32", "node_to": "int32", "hour": "int32"}
)
branches_df.set_index(["node_from", "node_to", "hour"], inplace=True)


con = sqlite3.connect("data.db")


nodes_df.to_sql("nodes", con=con)
branches_df.to_sql("branches", con=con)
