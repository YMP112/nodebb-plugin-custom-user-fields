<h1>Custom User Fields Settings</h1>
<form method="post" action="{{url}}/admin/plugins/custom-user-fields">
  <div class="form-group">
    <label for="fields">Custom Fields (JSON Format)</label>
    <textarea name="fields" class="form-control" rows="5">{{settings.fields || '[]'}}</textarea>
    <small>Define custom fields in JSON format, e.g., [{"name": "Occupation"}, {"name": "Car"}]</small>
  </div>
  <button type="submit" class="btn btn-primary">Save</button>
</form>
