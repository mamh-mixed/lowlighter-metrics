import { env } from "@utils/io.ts"
import core from "y/@actions/core@1.10.1"

function deprecated(message:string) {
  console.warn()
}

const to = {
  boolean(value:any) {
    return true
  }
}

export function compat(inputs:any) {
  const config = {plugins:[]} as any

  /*-
    - ❗ `plugin_introduction: yes` ➡️ `plugins: [{id: introduction}]`
    - ❌ `` ➡️ `processors: [{id: inject.style, args: {style: ".introduction .title { display: none }"}}]`
*/
  // 🙋 Introduction
  if (to.boolean(inputs.plugin_introduction)) {
    const plugin = {introduction: {}} as any
    deprecated(`<plugin_introduction> is deprecated, use <introduction> plugin`)

    deprecated(`<plugin_introduction_title> is deprecated, use <calendar> plugin with <calendar.range: ${duration}>`)
    const title = to.boolean(inputs.plugin_introduction_title)
    if (!title)
      plugin.processors = [{id: "inject.style", args: {style: ".introduction .title { display: none }"}}]

    config.plugins.push(plugin)
  }

  // 📅 Isometric commit calendar
  if (to.boolean(inputs.plugin_isocalendar)) {
    deprecated(`<plugin_isocalendar> is deprecated, use <calendar> plugin with <calendar.view: isometric>`)
    const duration = {"half-year":"last-180-days", "full-year":"last-365-days"}[inputs.plugin_isocalendar_duration as string] ?? "last-180-days"
    deprecated(`<plugin_isocalendar_duration> is deprecated, use <calendar> plugin with <calendar.range: ${duration}>`)
    config.plugins.push({calendar: {view: "isometric", duration}})
  }
}
