# HTML
## Terminology
> [Intro to HTML From MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Introduction)

* Tags
* Attributes
  * = Name + Value
  * There are boolean attributes that only have one value.
  ```html
  <input required="required">
  <input required="">
  <input required>
  ```

* **Named character references** - For characters that have special meaning in HTML
  * `&gt;` = `>`
  * `&lt;` = `<`
  * `&amp;` = `&` (ampersand)
  * `&quot;` = `"`
* Doctype
  * tells the browser how to interpret the HTML and CSS according to W3C standards
  * `<!DOCTYPE html>` for HTML5

## Basic structure
> [basic structure](http://www.sitepoint.com/web-foundations/basic-structure-of-a-web-page/#page-structure__fig-doc-tree)

```HTML
<!DOCTYPE html>

<html>
	<head> <!-- metadata -->
		<title>document's title</title> <!-- appears in the browser's title bar & search result 
        <!-- Other optional tags: * base * link * meta * object * script * style -->
	</head>

<body>

</body>
</html>

```

## Block-level elements
> [Block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)

* Block-level vs. inline
  * Formatting (begin on a new line)
  * [Content categories](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories) in HTML5
* HTML5 adds `<header>`, `<footer>`, `section`... block-level elements which roughly correspond to the category of *flow content* in HTML5.

## Element
* `table` ([ref](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table))

### Form
> [HTML forms guide](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms)
> * [My first HTML form](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form)

* `for` attribute on `<label>`: a formal way to link a label to a widget; should equal to `id` of corresponding widget -> click the label to activate its widget (especially for radio buttons and checkboxes)
  * a widget can be nested inside


* `type` attribute for `<input>` is important


* `<input />` is an auto-closing element which use `value` attribute to define default value
  *  `<textarea></textarea>` is not; just put default value between the two tags


* `<button>` has three type: `submit`, `reset`["From a UX point of view, this is considered bad practice."], `button`
  * can also use `<input>` to produce a button. (The main difference with the `<button>` element is that the `<input>` element only allows plain text as its label whereas the `<button>` element allows full HTML content as its label. `??`)


> * [How to structure an HTML form](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/How_to_structure_an_HTML_form) -> for usability and accessibility.

* Attributes for `<form>` element
  * all of them optional


* `<fieldset>`: create groups of widgets that share the same purpose
  * can be labeled with a `legend` element


* `<output>` element: store the output of a calculation.
  * `<for>` indicating that those elements contribute input values to (or otherwise affect) the calculation.

HTML widgets
* `<input>` can be almost anything setting its `type` attribute
  * Single line text fields: `text`, `email`, `password`, `search`, `tel`, `url`
  * Controls without text input: `checkbox`, `color`, `file`, `hidden`, `number`, `radio`, `range`
  * Time and date controls (Not supported in some browser)
  * Buttons: `button`, `image`(A graphical submit button, with `src` and `alt`), `reset`, `submit`


* `<textarea>` allows multiple lines
  * attributes: `cols`, `rows`, `wrap`


* `<select>` builds select boxes
  * `<option>`, which can be grouped inside `<optgroup>`

[`[DEMO AT CODEPEN]`](http://codepen.io/weicliu/pen/oxwwGq)

* `<datalist>`:extends the existing widgets by providing preset values for given widgets.

* `<meter>` and `<progress>`: two elements are a way to graphically represent a given numeric value.


* `<button>`
  * can use `form*` attributes to override corresponding form attributes when it's a submit button

> See [The native form widgets](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/The_native_form_widgets) for details.