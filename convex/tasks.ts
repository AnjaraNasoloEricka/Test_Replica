import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const getTaskById = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addTask = mutation({
  args: { 
    task : v.object({
      text: v.string(),
      isCompleted: v.boolean()
    })
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", args.task);
  },
});

export const updateTask = mutation({
  args: { 
    id: v.id("tasks"),
    task : v.object({
      text: v.string(),
      isCompleted: v.boolean()
    })
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.replace(id, args.task);
    console.log(await ctx.db.get(id));
  }
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
