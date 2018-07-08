export const fieldRender = (h, el, ctx) => {
  return h('field', { class: el.classNames, props: {
    id: el.id, 
    inline: el.inline, 
    problems: el.problems,
    label: el.label, 
    validate: el.validate,
    title: el.title,
    tooltip: el.tooltip,
    editable: el.editable,
    visible: el.visible
  } }, [ctx])
}